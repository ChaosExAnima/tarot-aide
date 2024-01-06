import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonProps, useDisclosure } from '@nextui-org/react';
import { ReactNode } from 'react';

import DatePickerModal from './modal';

export interface DatePickerProps {
	onPick: (date: Date) => void;
	label?: ReactNode;
	value?: Date;
}

export default function DatePicker({
	onPick,
	label = 'Pick a date',
	value = new Date(),
	...props
}: DatePickerProps & Omit<ButtonProps, 'value'>) {
	const { isOpen, onOpen, ...disclosureCbs } = useDisclosure();

	if (!isOpen) {
		return <DatePickerButton {...props} onPress={onOpen} />;
	}

	return (
		<>
			<DatePickerButton {...props} onPress={onOpen} />
			<DatePickerModal
				onPick={onPick}
				label={label}
				value={value}
				{...disclosureCbs}
			/>
		</>
	);
}

export function DatePickerButton({ onPress, children, ...props }: ButtonProps) {
	return (
		<Button isIconOnly {...props} onPress={onPress}>
			{children ?? <FontAwesomeIcon icon={faCalendar} />}
		</Button>
	);
}
