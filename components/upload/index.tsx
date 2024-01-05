import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Button, Image } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';

import CancelButton from 'components/buttons/cancel';

import CameraUpload from './video';

type UploadState = 'initial' | 'camera' | 'image';

export interface UploadControlsProps {
	onSelect: (image: Blob | null) => void;
}

export default function UploadControls({ onSelect }: UploadControlsProps) {
	const fileRef = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState<string | null>(null);
	const [state, setState] = useState<UploadState>('initial');

	const loadImage = async (photo: Blob | null) => {
		console.log('loading image...');
		if (!photo) {
			return resetImage();
		}
		onSelect(photo);

		const reader = new FileReader();
		reader.addEventListener('load', () => {
			console.log('image loaded');
			setImage(reader.result as string);
			setState('image');
		});
		reader.readAsDataURL(photo);
	};

	const resetImage = () => {
		setState('initial');
		setImage(null);
		onSelect(null);
	};

	const getImageFromInput = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) {
			setImage(null);
			return;
		}
		loadImage(file);
	};

	return (
		<section>
			{state === 'initial' && (
				<ButtonGroup fullWidth className="h-20">
					<Button
						color="primary"
						className="h-full"
						startContent={<FontAwesomeIcon icon={faCamera} />}
						onPress={() => setState('camera')}
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
			{state === 'camera' && <CameraUpload onSelect={loadImage} />}
			{state === 'image' && image && (
				<figure className="relative">
					<Image
						src={image}
						width="100%"
						height="100%"
						alt="Uploaded image"
					/>
					<CancelButton
						onPress={resetImage}
						className="absolute top-2 right-2 z-20"
						aria-label="Delete this image"
					/>
				</figure>
			)}
			<input
				type="file"
				className="hidden"
				accept="image/*"
				name="photo"
				ref={fileRef}
				onChange={getImageFromInput}
			/>
		</section>
	);
}
