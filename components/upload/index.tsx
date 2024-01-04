import { faCamera, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Button, Image } from '@nextui-org/react';
import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';

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
			{state === 'camera' && <TakeImage onPickPhoto={loadImage} />}
			{state === 'image' && (
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

async function loadVideoStream(
	videoRef: RefObject<HTMLVideoElement>,
	onError: (_: string) => void,
) {
	if (!videoRef.current) {
		return;
	}
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false,
		});
		if (!videoRef.current.srcObject) {
			videoRef.current.srcObject = stream;
		}
		await videoRef.current?.play();
	} catch (err) {
		console.error(err);
		if (err instanceof Error) {
			onError(err.message);
		}
	}
}

function TakeImage({ onPickPhoto }: { onPickPhoto: (_: string) => void }) {
	const [errorMessage, setErrorMessage] = useState('');
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		loadVideoStream(videoRef, setErrorMessage);
	}, [videoRef]);

	const onTakePhoto = () => {
		if (!videoRef.current || !canvasRef.current) {
			return;
		}
		const context = canvasRef.current.getContext('2d');
		if (!context) {
			return;
		}
		const video = videoRef.current;
		video.pause();

		context.drawImage(video, 0, 0, 640, 480);

		const data = canvasRef.current.toDataURL('image/png');
		onPickPhoto(data);
	};

	return (
		<>
			<video ref={videoRef} className="rounded-xl">
				Video stream not available.
			</video>
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			<canvas
				ref={canvasRef}
				className="hidden"
				width="640"
				height="480"
			></canvas>
			<Button
				color="primary"
				className="mt-4"
				fullWidth
				startContent={<FontAwesomeIcon icon={faCamera} />}
				onPress={onTakePhoto}
			>
				Take photo
			</Button>
		</>
	);
}
