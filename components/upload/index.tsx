import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Button } from '@nextui-org/react';

export default function Upload() {
	return (
		<ButtonGroup as="section" className="h-20">
			<Button
				fullWidth
				color="primary"
				className="h-full"
				startContent={<FontAwesomeIcon icon={faCamera} />}
			>
				Take photo
			</Button>
			<Button
				fullWidth
				color="secondary"
				className="h-full text-slate-900"
				startContent={<FontAwesomeIcon icon={faUpload} />}
			>
				Upload
			</Button>
		</ButtonGroup>
	);
}
