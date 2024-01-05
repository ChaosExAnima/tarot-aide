import { Formidable } from 'formidable';
import { z } from 'zod';

import type { NextApiRequest, NextApiResponse } from 'next';

const bodySchema = z.object({
	date: z.coerce.date().optional(),
	photo: z.instanceof(File).optional(),
	cards: z.array(z.string()).nonempty(),
	name: z.string().optional(),
	description: z.string().optional(),
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed' });
		return;
	}

	try {
		const form = new Formidable({
			uploadDir: './',
			keepExtensions: true,
		});
		const [fields, files] = await form.parse(req);
		const spread = bodySchema.parse(fields);
		console.log(files, spread);
		res.status(200).json({ message: 'Spread saved', spread });
	} catch (error) {
		console.log(error);

		res.status(400).json({ message: 'Invalid request', error });
		return;
	}
}
