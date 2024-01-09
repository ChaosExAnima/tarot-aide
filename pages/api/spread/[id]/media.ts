import { z } from 'zod';

import { ApiError, handlerWithError } from 'lib/api';
import { parseForm, deleteMedia, processPhoto, MediaType } from 'lib/media';
import { includes } from 'lib/types';
import { getCurrentUserId } from 'lib/users';

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
	if (type === 'photo') {
		await processPhoto(media, spreadId, userId);
	} else {
		throw new ApiError(501, 'Audio not implemented');
	}
});

export default handler;
