import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonProps } from '@nextui-org/react';

export default function SaveButton(props: ButtonProps) {
	return (
		<Button
			isIconOnly
			color="success"
			variant="light"
			{...props}
			className={`rounded-full ${props.className}}`}
		>
			{props.children ?? <FontAwesomeIcon icon={faSave} size="xl" />}
		</Button>
	);
}
