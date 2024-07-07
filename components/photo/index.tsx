import Image from 'next/image';

import type { Photo } from 'lib/media';

interface PhotoProps {
	photo: Photo | null;
	className?: string;
	alt?: string;
}

export default function Photo({ photo, alt, className = '' }: PhotoProps) {
	if (!photo) {
		return null;
	}
	const base = process.env.BASE_PATH ?? '';
	return (
		<Image
			src={`${base}/images/${photo.userId}/${photo.path}`}
			width={photo.width}
			height={photo.height}
			alt={alt ?? 'Tarot spread'}
			blurDataURL={photo.blurImage}
			placeholder={photo.blurImage ? 'blur' : 'empty'}
			className={`${className} rounded-lg w-full h-auto`}
			sizes="100vw (max-width: 768px), 740px"
		/>
	);
}
