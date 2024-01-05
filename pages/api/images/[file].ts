import { NextApiRequest, NextApiResponse } from 'next';
import serveStatic from 'serve-static';

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
	console.log('serving image', req.query.file);

	console.log(req.url?.replace('/images', ''));

	serve(req, res, (err) => {
		if (err) {
			console.error(err);
			res.status(500).end();
			return;
		}
		res.status(404).end();
	});
}
