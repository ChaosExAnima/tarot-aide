import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConfirmationModal from 'components/confirmation-modal';
import Photo from 'components/photo';
import UploadControls from 'components/upload';

import { useEditSpread } from './hooks';

export default function SpreadPhoto() {
	const {
		editing,
		spread: { photo },
	} = useEditSpread();

	if (!editing) {
		if (photo) {
			return <Photo photo={photo} />;
		}
		return null;
	}

	if (!photo) {
		return <UploadControls onSelect={console.log} />;
	}

	return (
		<figure className="relative">
			<Photo photo={photo} />
			<ConfirmationModal
				onConfirm={console.log}
				className="absolute top-2 right-2 z-20 rounded-full"
				isIconOnly
				color="danger"
				aria-label="Delete this image"
				header="Delete this image?"
			>
				<FontAwesomeIcon icon={faXmark} />
			</ConfirmationModal>
		</figure>
	);
}
