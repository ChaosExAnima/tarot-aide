import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import { useState, useRef, useEffect, RefObject } from 'react';

interface CameraUploadProps {
	onSelect: (_: string) => void;
}

export default function CameraUpload({ onSelect }: CameraUploadProps) {
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
		onSelect(data);
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
