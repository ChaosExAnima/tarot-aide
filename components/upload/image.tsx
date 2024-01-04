import { Image } from '@nextui-org/react';

import CancelButton from 'components/buttons/cancel';

interface UploadImageProps {
	image: string;
	onRemove: () => void;
}

export default function UploadImage({ image, onRemove }: UploadImageProps) {
	return (
		<figure className="relative">
			<Image
				src={image}
				width="100%"
				height="100%"
				alt="Uploaded image"
			/>
			<CancelButton
				onPress={onRemove}
				className="absolute top-2 right-2 z-20"
				aria-label="Delete this image"
			/>
		</figure>
	);
}
