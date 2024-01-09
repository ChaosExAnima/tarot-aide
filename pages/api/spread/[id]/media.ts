import { NextApiRequest } from 'next';
import { z } from 'zod';

import { ApiError, ResponseBody, handlerWithError } from 'lib/api';
import {
	parseForm,
	deleteMedia,
	processPhoto,
	MediaType,
	Media,
} from 'lib/media';
import { includes } from 'lib/types';
import { getCurrentUserId } from 'lib/users';

export interface SpreadMediaUploadResponse extends ResponseBody {
	media: Media;
}

const handler = handlerWithError(['PUT', 'POST', 'DELETE'], async (req) => {
	const spreadId = z.coerce.number().positive().int().parse(req.query.id);
	const userId = getCurrentUserId();

	if (req.method === 'DELETE') {
		return handleDelete(spreadId, userId, req);
	}
	const [fields, files] = await parseForm<'type', 'media'>(req);
	const type = fields.type?.at(0);
	if (!type || !includes<MediaType>(['photo', 'audio'], type)) {
		throw new ApiError(400, 'Missing or invalid type');
	}
	const media = files.media?.at(0);
	if (!media) {
		throw new ApiError(400, 'Missing photo or audio');
	}
	// Delete old media, if it exists
	await deleteMedia(spreadId, type, userId);
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
});

async function handleDelete(
	spreadId: number,
	userId: number,
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
		.parse(req.body);
	if (!type) {
		throw new ApiError(400, 'Missing or invalid type');
	}
	const results = await deleteMedia(spreadId, type, userId);
	return {
		success: true,
		message: `Deleted ${results.count} media`,
	};
}

export default handler;
