import { Media } from '@prisma/client';
import { File, Formidable } from 'formidable';
import { unlink } from 'fs/promises';
import sizeOf from 'image-size';
import { resolve } from 'path';
import { promisify } from 'util';

import prisma from './db';
import { getCurrentUserId } from './users';

import type { NextApiRequest } from 'next';

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

export async function deleteMedia(
	spreadId: number,
	type: 'photo' | 'audio',
	userId = getCurrentUserId(),
) {
	const result = await prisma.media.findMany({
		where: {
			spreadId,
			type,
			userId,
		},
	});
	if (!result.length) {
		throw new Error('Media not found');
	}
	await prisma.media.deleteMany({
		where: {
			path: {
				in: result.map((media) => media.path),
			},
		},
	});
	for (const { path } of result) {
		await unlink(resolve(process.cwd(), `uploads/${userId}/${path}`));
	}
	return result;
}
export function parseForm<FieldKey extends string, FileKey extends string>(
	req: NextApiRequest,
) {
	const form = new Formidable({
		uploadDir: `uploads/${getCurrentUserId()}}`,
		keepExtensions: true,
		allowEmptyFiles: false,
		maxFiles: 1,
	});
	return form.parse<FieldKey, FileKey>(req);
}
