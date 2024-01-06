import { Image, ImageProps } from '@nextui-org/react';
import NextImage from 'next/image';

import type { Photo } from 'lib/media';

interface PhotoProps {
	photo: Photo | null;
}

export default function Photo({ photo, ...props }: PhotoProps & ImageProps) {
	if (!photo) {
		return null;
	}
	return (
		<Image
			as={NextImage}
			src={`/images/${photo.path}`}
			width={photo.width}
			height={photo.width}
			alt={props.alt ?? 'Tarot spread'}
			{...props}
		/>
	);
}
