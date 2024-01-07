export type Nullable<T> = T | null;

export function includes<T>(array: readonly T[], item: T): item is T {
	return array.includes(item as T);
}

export interface ClassNameProps {
	className?: string;
}

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
