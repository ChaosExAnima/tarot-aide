export interface ErrorReponseBody {
	message: string;
	success: false;
}

export interface SpreadCreatedResponseBody {
	message: string;
	success: true;
	spreadId: number;
}

export type SpreadResponseBody = ErrorReponseBody | SpreadCreatedResponseBody;
