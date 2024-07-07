import { NextApiRequest } from 'next';
import { z } from 'zod';

import { ApiError, ResponseBody, handlerWithError } from 'lib/api';
import {
	parseForm,
	deleteSpreadMedia,
	processPhoto,
	MediaType,
	Media,
	ensureUploadPath,
	deleteMedia,
} from 'lib/media';
import { includes } from 'lib/types';
import { userFromApiRequest } from 'lib/users';

export interface SpreadMediaUploadResponse extends ResponseBody {
	media: Media;
}

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler = handlerWithError(
	['PUT', 'POST', 'DELETE'],
	async (req, res) => {
		const spreadId = z.coerce.number().positive().int().parse(req.query.id);
		const user = await userFromApiRequest(req, res);

		if (req.method === 'DELETE') {
			return handleDelete(spreadId, user.id, req);
		}
		return handleCreate(spreadId, user.id, req);
	},
);

async function handleCreate(
	spreadId: number,
	userId: string,
	req: NextApiRequest,
): Promise<SpreadMediaUploadResponse> {
	const uploadDir = await ensureUploadPath(userId);
	const [fields, files] = await parseForm<'type', 'media'>(req, uploadDir);
	try {
		const type = fields.type?.at(0);
		if (!type || !includes<MediaType>(['photo', 'audio'], type)) {
			throw new ApiError(400, 'Missing or invalid type');
		}
		const media = files.media?.at(0);
		if (!media) {
			throw new ApiError(400, 'Missing photo or audio');
		}
		// Delete old media, if it exists
		await deleteSpreadMedia(spreadId, type, userId);
		let newMedia: Media;
		if (type === 'photo') {
			newMedia = await processPhoto(media, spreadId, userId);
		} else {
			throw new ApiError(501, 'Audio not implemented');
		}
		return {
			success: true,
			message: 'Media uploaded',
			media: newMedia,
		} satisfies SpreadMediaUploadResponse;
	} catch (err) {
		const media = files.media?.at(0);
		if (media) {
			await deleteMedia(media);
		}
		throw err;
	}
}

async function handleDelete(
	spreadId: number,
	userId: string,
	req: NextApiRequest,
): Promise<ResponseBody> {
	const { type } = z
		.object({
			type: z
				.string()
				.refine((type): type is MediaType =>
					includes<MediaType>(['photo', 'audio'], type),
				),
		})
		.parse(req.query);
	const results = await deleteSpreadMedia(spreadId, type, userId);
	return {
		success: true,
		message: `Deleted ${results.count} media`,
	};
}

export default handler;
