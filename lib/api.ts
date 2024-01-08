import { stringify } from 'superjson';

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

export async function fetchFromApi<Body extends ResponseBody>(
	path: string,
	data?: BodyInit,
) {
	let options: RequestInit = {};
	if (data) {
		options = {
			method: 'POST',
			body: stringify(data),
		};
	}
	const response = await fetch(path, options);
	const body: ResponseWithError<Body> = await response.json();
	if (!response.ok || !body.success) {
		throw new Error(body.message ?? 'Unknown error');
	}
	return body;
}
