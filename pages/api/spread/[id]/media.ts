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
	const [fields, files] = await parseForm<'type', 'media'>(req);
	const type = fields.type?.at(0);
	if (!type || !includes<MediaType>(['photo', 'audio'], type)) {
		throw new ApiError(400, 'Missing or invalid type');
	}
	if (req.method === 'DELETE') {
		try {
			const results = await deleteMedia(spreadId, type, userId);
			return {
				success: true,
				message: `Deleted ${results.count} media`,
			};
		} catch (err) {
			console.log('Error deleting media', fields, err);
		}
		throw new ApiError(500, 'Could not delete media');
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

export default handler;
