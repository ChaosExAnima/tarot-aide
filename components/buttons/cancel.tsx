import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonProps } from '@nextui-org/react';
import clsx from 'clsx';

export default function CancelButton({ className, ...props }: ButtonProps) {
	return (
		<Button
			{...props}
			isIconOnly
			color="danger"
			className={clsx('rounded-full', className)}
		>
			<FontAwesomeIcon icon={faXmark} />
		</Button>
	);
}
