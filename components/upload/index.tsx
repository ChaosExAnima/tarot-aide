import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Button } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';

import UploadImage from './image';
import CameraUpload from './video';

type UploadState = 'initial' | 'camera' | 'image';

export default function UploadControls() {
	const [image, setImage] = useState<string | null>(null);
	const fileRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<UploadState>('initial');

	const loadImage = (imageData: string) => {
		setState('image');
		setImage(imageData);
	};

	const onReset = () => {
		setState('initial');
		setImage(null);
	};

	const saveImage = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) {
			setImage(null);
			return;
		}
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => loadImage(reader.result as string),
			false,
		);
		reader.readAsDataURL(file);
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
				<UploadImage image={image} onRemove={onReset} />
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
