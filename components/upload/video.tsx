import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CircularProgress } from '@nextui-org/react';
import { useState, useRef, useEffect, RefObject } from 'react';

import { UploadControlsProps } from '.';

export default function CameraUpload({ onSelect }: UploadControlsProps) {
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		loadVideoStream(videoRef, setErrorMessage, () => setLoading(false));
	}, [videoRef]);

	const onTakePhoto = () => {
		if (!videoRef.current || !canvasRef.current) {
			return;
		}
		const context = canvasRef.current.getContext('2d');
		if (!context) {
			return;
		}
		// Get the image
		const video = videoRef.current;
		context.drawImage(video, 0, 0, 640, 480);
		canvasRef.current.toBlob((blob) => {
			console.log('video blob', blob);
			onSelect(blob);
			// Clean up
			if (video.srcObject) {
				(video.srcObject as MediaStream)
					.getTracks()
					.forEach((track) => track.stop());
				video.srcObject = null;
			}
		});
	};

	return (
		<>
			<figure className="relative">
				<video ref={videoRef} className="rounded-xl text-white">
					Video stream not available.
				</video>
				{loading && (
					<CircularProgress className="absolute top-[calc(50%-20px)] left-[calc(50%-20px)]" />
				)}
				{errorMessage && <p className="text-danger">{errorMessage}</p>}
			</figure>
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
	onSuccess: () => void,
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
		onSuccess();
	} catch (err) {
		console.error(err);
		if (err instanceof Error) {
			onError(err.message);
		}
	}
}
