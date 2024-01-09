import { File } from 'formidable';
import { z } from 'zod';

import { ApiError, handlerWithError } from 'lib/api';
import { parseForm, deleteMedia, processPhoto } from 'lib/media';
import { getCurrentUserId } from 'lib/users';

type EndpointKeys = 'photo' | 'audio';

const handler = handlerWithError(['PUT', 'POST', 'DELETE'], async (req) => {
	const spreadId = z.coerce.number().positive().int().parse(req.query.id);
	const userId = getCurrentUserId();
	const [fields, files] = await parseForm<EndpointKeys, EndpointKeys>(req);
	if (req.method === 'DELETE') {
		const { type } = getMediaFromFields(fields);
		try {
			const results = await deleteMedia(spreadId, type, userId);
			return {
				success: true,
				message: `Deleted ${results.length} media`,
			};
		} catch (err) {
			console.log('Error deleting media', fields, err);
		}
		throw new ApiError(500, 'Could not delete media');
	}

	const { media, type } = getMediaFromFields(files);
	if (type === 'photo') {
		await processPhoto(media, spreadId, userId);
	} else {
		throw new ApiError(501, 'Audio not implemented');
	}
});

function getMediaFromFields<Value extends File | string>(fields: {
	[Key in EndpointKeys]?: Value[];
}) {
	const photo = fields.photo?.at(0);
	const audio = fields.audio?.at(0);
	if (photo) {
		return { media: photo, type: 'photo' } as const;
	} else if (audio) {
		return { media: audio, type: 'audio' } as const;
	}
	throw new ApiError(400, 'Missing photo or audio');
}

export default handler;
