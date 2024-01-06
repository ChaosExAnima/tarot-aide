import { Media } from '@prisma/client';
import { File } from 'formidable';
import sizeOf from 'image-size';
import { promisify } from 'util';

import prisma from './db';
import { getCurrentUserId } from './users';

const PHOTO_TYPE = 'photo';
const AUDIO_TYPE = 'audio';

export interface Photo extends Media {
	type: typeof PHOTO_TYPE;
	width: number;
	height: number;
}

export interface Audio extends Media {
	type: typeof AUDIO_TYPE;
	duration: number;
}

export function isPhoto(media: Media): media is Photo {
	return media.type === PHOTO_TYPE;
}

export function isAudio(media: Media): media is Audio {
	return media.type === AUDIO_TYPE;
}

const asyncSizeOf = promisify(sizeOf);

export const ALLOWED_IMAGE_TYPES = ['jpg', 'png', 'webp'];

export async function processPhoto(
	file: File,
	spreadId: number,
	userId = getCurrentUserId(),
): Promise<Media> {
	const image = await asyncSizeOf(file.filepath);
	if (!image) {
		throw new Error('Could not determine image size');
	}
	if (!image.type || !ALLOWED_IMAGE_TYPES.includes(image.type)) {
		throw new Error('Invalid image type');
	}
	return await prisma.media.create({
		data: {
			spreadId: spreadId,
			path: file.newFilename,
			type: PHOTO_TYPE,
			width: image.width,
			height: image.height,
			userId: userId,
		},
	});
}
