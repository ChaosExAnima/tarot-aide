import { Media } from '@prisma/client';
import { File } from 'formidable';
import sizeOf from 'image-size';
import { promisify } from 'util';

import prisma from './db';
import { getCurrentUserId } from './users';

export interface Photo extends Media {
	type: 'photo';
	width: number;
	height: number;
}

export interface Audio extends Media {
	type: 'audio';
	duration: number;
}

export function isPhoto(media: Media): media is Photo {
	return media.type === 'photo';
}

export function isAudio(media: Media): media is Audio {
	return media.type === 'audio';
}

const asyncSizeOf = promisify(sizeOf);

export const ALLOWED_IMAGE_TYPES = ['jpg', 'png', 'webp'];

export async function processPhoto(
	file: File,
	spreadId: number,
	userId?: number,
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
			path: file.filepath,
			type: 'image',
			width: image.width,
			height: image.height,
			userId: userId ?? getCurrentUserId(),
		},
	});
}
