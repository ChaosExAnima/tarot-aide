import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed' });
		return;
	}
	const data = req.body;
	// TODO: Validate data
	res.status(200).json({ message: 'Spread saved', data });
}
