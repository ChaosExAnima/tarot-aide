import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Image } from '@nextui-org/react';

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
			<Button
				isIconOnly
				color="danger"
				onPress={onRemove}
				aria-label="Delete this image"
				className="absolute top-2 right-2 z-20 rounded-full"
			>
				<FontAwesomeIcon icon={faXmark} />
			</Button>
		</figure>
	);
}
