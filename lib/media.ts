import { File, Formidable } from 'formidable';
import * as fs from 'fs/promises';
import sizeOf from 'image-size';
import { promisify } from 'util';
import { z } from 'zod';

import prisma from './db';

import type { NextApiRequest } from 'next';

const PHOTO_TYPE = 'photo';
const AUDIO_TYPE = 'audio';
export type MediaType = typeof PHOTO_TYPE | typeof AUDIO_TYPE;

interface BaseMedia {
	path: string;
	userId: string;
}

export interface Photo extends BaseMedia {
	type: typeof PHOTO_TYPE;
	width?: number;
	height?: number;
}

export interface Audio extends BaseMedia {
	type: typeof AUDIO_TYPE;
	duration?: number;
}

export type Media = Photo | Audio;

export function isMedia(media: unknown): media is Media {
	return z
		.object({
			path: z.string(),
			type: z.enum([PHOTO_TYPE, AUDIO_TYPE]),
			width: z.number().optional(),
			height: z.number().optional(),
			duration: z.number().optional(),
		})
		.safeParse(media).success;
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
	userId: string,
): Promise<Photo> {
	const image = await asyncSizeOf(file.filepath);
	if (!image) {
		throw new Error('Could not determine image size');
	}
	if (!image.type || !ALLOWED_IMAGE_TYPES.includes(image.type)) {
		throw new Error('Invalid image type');
	}
	const result = await prisma.media.create({
		data: {
			spreadId: spreadId,
			path: file.newFilename,
			type: PHOTO_TYPE,
			width: image.width,
			height: image.height,
			userId: userId,
		},
	});
	return {
		type: PHOTO_TYPE,
		path: result.path,
		userId,
		width: image.width,
		height: image.height,
	};
}

export function deleteMedia(media: File) {
	return fs.rm(media.filepath);
}

export function deleteSpreadMedia(
	spreadId: number,
	type: MediaType,
	userId: string,
) {
	return prisma.media.updateMany({
		where: {
			spreadId,
			type,
			userId,
		},
		data: {
			deleted: true,
		},
	});
}

export async function ensureUploadPath(userId: string): Promise<string> {
	const uploadDir = `${process.env.UPLOAD_PATH ?? 'uploads'}/${userId}`;
	try {
		await fs.access(uploadDir, fs.constants.W_OK);
	} catch (err) {
		await fs.mkdir(uploadDir, { recursive: true });
	}
	return uploadDir;
}

export async function parseForm<
	FieldKey extends string,
	FileKey extends string,
>(req: NextApiRequest, uploadDir: string) {
	const form = new Formidable({
		uploadDir,
		keepExtensions: true,
		allowEmptyFiles: false,
		maxFiles: 1,
	});
	return form.parse<FieldKey, FileKey>(req);
}
