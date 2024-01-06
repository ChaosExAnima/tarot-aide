import { NextApiRequest, NextApiResponse } from 'next';
import serveStatic from 'serve-static';

import { getCurrentUserId } from 'lib/users';

export const config = {
	api: {
		externalResolver: true,
		responseLimit: false,
	},
};

const serve = serveStatic('uploads', { index: false, fallthrough: false });

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const userId = getCurrentUserId();
	req.url = req.url?.replace('/images', `/${userId}`);

	serve(req, res, (err) => {
		if (err) {
			console.error(err);
			res.status(500).end();
			return;
		}
		res.status(404).end();
	});
}