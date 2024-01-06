import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	ButtonProps,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from '@nextui-org/react';
import { ChangeEvent, ReactNode } from 'react';

import { getMonths, getYears } from './constants';
import { useDate } from './hooks';

interface DatePickerProps extends Omit<ButtonProps, 'value'> {
	onPick: (date: Date) => void;
	label?: ReactNode;
	value?: Date;
}

const months = getMonths();
const years = getYears();

export default function DatePicker({
	children,
	onPick,
	label = 'Pick a date',
	value = new Date(),
	...props
}: DatePickerProps) {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const { date, days, setDay, setMonth, setYear } = useDate(value);

	const onChange =
		(cb: (value: number) => void) =>
		(event: ChangeEvent<HTMLSelectElement>) =>
			cb(Number(event.target.value));

	const select = (date: Date) => {
		onPick(date);
		onClose();
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
				backdrop="blur"
				classNames={{
					wrapper: 'top-10',
				}}
				hideCloseButton
			>
				<ModalContent>
					<ModalHeader>{label}</ModalHeader>
					<ModalBody className="pb-6">
						<div className="flex gap-2">
							<Select
								label="Month"
								selectedKeys={[String(date.getMonth())]}
								onChange={onChange(setMonth)}
							>
								{months.map(({ value, label }) => (
									<SelectItem key={value}>{label}</SelectItem>
								))}
							</Select>
							<Select
								label="Day"
								items={days}
								selectedKeys={[String(date.getDate())]}
								onChange={onChange(setDay)}
							>
								{({ value, label }) => (
									<SelectItem key={value} value={value}>
										{label}
									</SelectItem>
								)}
							</Select>
							<Select
								label="Year"
								selectedKeys={[String(date.getFullYear())]}
								onChange={onChange(setYear)}
							>
								{years.map(({ value, label }) => (
									<SelectItem key={value}>{label}</SelectItem>
								))}
							</Select>
						</div>
						<Button
							className="mt-2 rounded-xl"
							fullWidth
							onClick={() => select(date)}
							color="success"
						>
							Save
						</Button>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Button isIconOnly {...props} onPress={onOpen}>
				{children ?? <FontAwesomeIcon icon={faCalendar} />}
			</Button>
		</>
	);
}
