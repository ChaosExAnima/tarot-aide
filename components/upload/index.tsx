import { faCamera, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Button, Image } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';

export default function UploadControls() {
	const [image, setImage] = useState<string | null>(null);
	const fileRef = useRef<HTMLInputElement>(null);

	const saveImage = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) {
			setImage(null);
			return;
		}
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				setImage(reader.result as string);
			},
			false,
		);
		reader.readAsDataURL(file);
	};

	return (
		<section>
			<UploadImage image={image} onRemove={() => setImage(null)} />
			{!image && (
				<ButtonGroup fullWidth className="h-20">
					<Button
						color="primary"
						className="h-full"
						startContent={<FontAwesomeIcon icon={faCamera} />}
					>
						Take photo
					</Button>
					<Button
						color="secondary"
						className="h-full text-slate-900"
						startContent={<FontAwesomeIcon icon={faUpload} />}
						onPress={() => fileRef?.current?.click()}
					>
						Upload
					</Button>
				</ButtonGroup>
			)}
			<input
				type="file"
				className="hidden"
				accept="image/*"
				ref={fileRef}
				onChange={saveImage}
			/>
		</section>
	);
}

function UploadImage({
	image,
	onRemove,
}: {
	image: string | null;
	onRemove?: () => void;
}) {
	if (!image) {
		return null;
	}
	return (
		<figure className="relative">
			<Image
				src={image}
				width="100%"
				height="100%"
				alt="Uploaded image"
			/>
			{onRemove && (
				<button
					className="absolute top-2 right-2 z-20 bg-danger rounded-full w-6 h-6 hover:bg-danger-500 transition-colors"
					aria-label="Delete this image"
					onClick={onRemove}
				>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			)}
		</figure>
	);
}
