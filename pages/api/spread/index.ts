import { ResponseBody, handlerWithError } from 'lib/api';
import prisma from 'lib/db';
import { userFromApiRequest } from 'lib/users';

export interface SpreadCreatedResponse extends ResponseBody {
	message: string;
	success: true;
	spreadId: number;
}

const handler = handlerWithError<SpreadCreatedResponse>(
	['POST'],
	async (req) => {
		const user = await userFromApiRequest(req);
		const spread = await prisma.spread.create({
			data: {
				name: '',
				userId: user.id,
			},
		});
		return {
			success: true,
			message: 'Spread created',
			spreadId: spread.id,
		};
	},
);
export default handler;
