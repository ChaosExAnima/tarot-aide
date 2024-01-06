import { NextApiRequest, NextApiResponse } from 'next';

import prisma from 'lib/db';
import { ResponseBody } from 'lib/spreads/api';
import { getCurrentUserId } from 'lib/users';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseBody>,
) {
	const spreadId = req.query.id;
	if (!spreadId) {
		res.status(400).json({ success: false, message: 'Missing spread ID' });
		return;
	}
	const userId = getCurrentUserId();
	try {
		switch (req.method) {
			case 'DELETE':
				await prisma.spread.delete({
					where: {
						id: Number(spreadId),
						userId,
					},
				});
				break;
			case 'PUT':
			case 'PATCH':
				res.status(405).json({
					success: false,
					message: 'Method not implemented',
				});
				return;
			default:
				res.status(405).json({
					success: false,
					message: 'Method not allowed',
				});
				return;
		}
		res.status(200).json({ success: true });
	} catch (err) {
		console.error(`Error deleting spread ${spreadId}:`, err);
		res.status(500).json({
			success: false,
			message: 'Could not delete spread',
		});
	}
}
