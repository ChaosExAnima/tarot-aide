import { IncomingMessage } from 'http';
import { NextRequest } from 'next/server';
import { parse, stringify } from 'superjson';
import { ZodError } from 'zod';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import type { SuperJSONValue } from 'superjson/dist/types';

export interface ResponseBody {
	message?: string;
	success: boolean;
}

export interface ErrorResponseBody extends ResponseBody {
	message: string;
	success: false;
	details?: unknown;
}

export type ResponseWithError<Body extends ResponseBody> =
	| Body
	| ErrorResponseBody;

export function isResponseBody(input: unknown): input is ResponseBody {
	return (
		typeof input === 'object' &&
		input !== null &&
		'success' in input &&
		typeof input.success === 'boolean'
	);
}

export function isErrorResponse(input: unknown): input is ErrorResponseBody {
	return isResponseBody(input) && !input.success;
}

export async function fetchFromApi<
	Response extends ResponseBody,
	RequestBody = SuperJSONValue,
>(path: string, data?: RequestBody, options?: RequestInit) {
	if (data) {
		options = {
			method: 'POST',
			body: stringify(data),
			...(options ?? {}),
		};
	}
	const base = process.env.BASE_PATH ?? '';
	const response = await fetch(`${base}/api${path}`, options);
	const body: ResponseWithError<Response> = await response.json();
	if (!response.ok) {
		body.success = false;
	}
	if (isErrorResponse(body)) {
		throw new ApiError(
			response.status,
			body.message ?? 'Unknown error',
			body,
		);
	}
	return body;
}

export type ApiHandler<Body extends ResponseBody> = (
	req: NextApiRequest,
	res: NextApiResponse<ResponseWithError<Body | ResponseBody>>,
) => Promise<void | Body>;

export type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type HandlerResponse<Body extends ResponseBody> = NextApiHandler<
	ResponseWithError<Body | ResponseBody>
>;

export function handlerWithError<Body extends ResponseBody>(
	handlerOrMethods: ApiHandler<Body>,
): HandlerResponse<Body>;
export function handlerWithError<Body extends ResponseBody>(
	handlerOrMethods: Methods[],
	handler: ApiHandler<Body>,
): HandlerResponse<Body>;
export function handlerWithError<Body extends ResponseBody>(
	handlerOrMethods: ApiHandler<Body> | Methods[],
	handler?: ApiHandler<Body>,
): HandlerResponse<Body> {
	return async (req, res) => {
		if (req.body && typeof req.body === 'string') {
			req.body = parse(req.body);
		}
		const realHandler = handler ?? (handlerOrMethods as ApiHandler<Body>);
		const methods = Array.isArray(handlerOrMethods) ? handlerOrMethods : [];
		try {
			if (
				methods.length > 0 &&
				(!req.method || !methods.includes(req.method as Methods))
			) {
				throw new ApiError(405, 'Method not allowed');
			}
			const response = await realHandler(req, res);
			if (typeof response === 'string') {
				res.status(200).send({ success: true, message: response });
			} else if (isResponseBody(response)) {
				res.status(200).json(response);
			}
		} catch (err) {
			console.error(`Error in route ${req.url}:`, err);
			const body: ErrorResponseBody = {
				success: false,
				message: 'Unknown error',
			};
			let status = 500;
			if (err instanceof Error) {
				body.message = err.message;
			}
			if (err instanceof ApiError) {
				status = err.statusCode;
			} else if (err instanceof ZodError) {
				status = 400;
				body.message = 'Validation failed';
				body.details = err.issues;
			}
			res.status(status).json(body);
		}
	};
}

export class ApiError extends Error {
	constructor(
		public statusCode = 500,
		message: string,
		public response?: ErrorResponseBody,
	) {
		super(message);
	}
}

export function headersFromRequest(
	req: NextRequest | IncomingMessage,
): Headers {
	let headers = new Headers();
	if (req instanceof NextRequest) {
		headers = req.headers;
	}
	if (req instanceof IncomingMessage) {
		for (const [key, value] of Object.entries(req.headers)) {
			if (Array.isArray(value)) {
				value.forEach((v) => headers.append(key, v));
			} else {
				headers.set(key, value as string);
			}
		}
	}
	return headers;
}
