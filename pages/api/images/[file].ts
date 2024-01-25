import { NextApiRequest, NextApiResponse } from 'next';
import serveStatic from 'serve-static';

import { userFromApiRequest } from 'lib/users';

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
	const user = await userFromApiRequest(req);
	req.url = req.url?.replace('/images', `/${user.id}`);

	serve(req, res, (err) => {
		if (err) {
			console.error(err);
			res.status(500).end();
			return;
		}
		res.status(404).end();
	});
}
