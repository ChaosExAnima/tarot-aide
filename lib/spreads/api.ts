export interface ResponseBody {
	message?: string;
	success: boolean;
}

export interface ErrorReponseBody extends ResponseBody {
	message: string;
	success: false;
}

export interface SpreadCreatedResponseBody extends ResponseBody {
	message: string;
	success: true;
	spreadId: number;
}

export type SpreadResponseBody = ErrorReponseBody | SpreadCreatedResponseBody;

export async function mutateDeleteSpread(spreadId: number) {
	const response = await fetch(`/api/spread/${spreadId}`, {
		method: 'DELETE',
	});
	const body: ResponseBody = await response.json();
	if (!response.ok) {
		throw new Error(body.message ?? 'Invalid response');
	}
}
