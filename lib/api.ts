import { stringify } from 'superjson';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import type { SuperJSONValue } from 'superjson/dist/types';

export interface ResponseBody {
	message?: string;
	success: boolean;
}

export interface ErrorReponseBody extends ResponseBody {
	message: string;
	success: false;
}

export type ResponseWithError<Body extends ResponseBody> =
	| Body
	| ErrorReponseBody;

export function isResponseBody(input: unknown): input is ResponseBody {
	return (
		typeof input === 'object' &&
		input !== null &&
		'success' in input &&
		typeof input.success === 'boolean'
	);
}

export async function fetchFromApi<Body extends ResponseBody>(
	path: string,
	data?: SuperJSONValue,
	options?: RequestInit,
) {
	if (data) {
		options = {
			method: 'POST',
			body: stringify(data),
			...(options ?? {}),
		};
	}
	const response = await fetch(path, options);
	const body: ResponseWithError<Body> = await response.json();
	if (!response.ok || !body.success) {
		throw new Error(body.message ?? 'Unknown error');
	}
	return body;
}

export type ApiHandler<Body extends ResponseBody> = (
	req: NextApiRequest,
	res: NextApiResponse<ResponseWithError<Body | ResponseBody>>,
) => Promise<void | Body>;

export type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function handlerWithError<Body extends ResponseBody>(
	handlerOrMethods: ApiHandler<Body>,
): NextApiHandler<ResponseWithError<Body | ResponseBody>>;
export function handlerWithError<Body extends ResponseBody>(
	methods: Methods[],
	handler: ApiHandler<Body>,
): NextApiHandler<ResponseWithError<Body | ResponseBody>>;
export function handlerWithError<Body extends ResponseBody>(
	handlerOrMethods: ApiHandler<Body> | Methods[],
	handler?: ApiHandler<Body>,
): NextApiHandler<ResponseWithError<Body | ResponseBody>> {
	return async (req, res) => {
		const realHandler = handler ?? (handlerOrMethods as ApiHandler<Body>);
		const methods = Array.isArray(handlerOrMethods) ? handlerOrMethods : [];
		try {
			if (
				methods.length &&
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
			let message = 'Unknown error';
			let status = 500;
			if (err instanceof ApiError) {
				status = err.statusCode;
			}
			if (err instanceof Error) {
				message = err.message;
			}
			res.status(status).json({ message, success: false });
		}
	};
}

export class ApiError extends Error {
	constructor(
		public statusCode = 500,
		message: string,
	) {
		super(message);
	}
}
