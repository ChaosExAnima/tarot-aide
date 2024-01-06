import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Select,
	SelectItem,
	Button,
	type useDisclosure,
} from '@nextui-org/react';
import { ChangeEvent } from 'react';

import { getMonths, getYears } from './constants';
import { useDatePicker } from './hooks';

import { DatePickerProps } from '.';

const months = getMonths();
const years = getYears();

export default function DatePickerModal({
	value,
	onPick,
	onClose,
	onOpenChange,
	label,
}: DatePickerProps &
	Pick<ReturnType<typeof useDisclosure>, 'onClose' | 'onOpenChange'>) {
	const { date, days, setDay, setMonth, setYear } = useDatePicker(value);
	const onChange =
		(cb: (value: number) => void) =>
		(event: ChangeEvent<HTMLSelectElement>) =>
			cb(Number(event.target.value));

	const select = (date: Date) => {
		onPick(date);
		onClose();
	};
	return (
		<Modal
			isOpen
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
	);
}
