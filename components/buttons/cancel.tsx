import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonProps } from '@nextui-org/react';

export default function CancelButton({ className, ...props }: ButtonProps) {
	return (
		<Button
			{...props}
			isIconOnly
			color="danger"
			aria-label="Delete this image"
			className={`rounded-full ${className}`}
		>
			<FontAwesomeIcon icon={faXmark} />
		</Button>
	);
}
