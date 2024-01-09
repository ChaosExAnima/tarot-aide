import {
	faCalendar,
	faCancel,
	faEdit,
	faSave,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Button, Input, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import router from 'next/router';

import ConfirmationModal from 'components/confirmation-modal';
import DatePicker from 'components/date-picker';
import { mutateDeleteSpread } from 'lib/spreads/api';
import { displaySpreadName } from 'lib/spreads/utils';
import { displayDate } from 'lib/text';

import { useEditSpread } from './hooks';

export default function SpreadHeader() {
	const { spread, editing, toggleEditing } = useEditSpread();
	const deleteSpread = useMutation({
		mutationFn: () => mutateDeleteSpread(spread.id),
		onSuccess: () => router.push('/spreads'),
	});
	if (editing) {
		return <SpreadHeaderEdit />;
	}

	return (
		<header className="flex flex-col">
			<div className="flex flex-nowrap gap-4 items-center mb-4">
				<h1 className="grow font-bold text-2xl">
					{displaySpreadName(spread)}
				</h1>
				<ButtonGroup isDisabled={deleteSpread.isPending}>
					<Button onPress={toggleEditing} color="primary" isIconOnly>
						<FontAwesomeIcon icon={faEdit} />
					</Button>
					<ConfirmationModal
						isIconOnly
						onConfirm={deleteSpread.mutate}
						header="Delete this spread?"
						body="This is permanent!"
					>
						<FontAwesomeIcon icon={faTrash} />
					</ConfirmationModal>
				</ButtonGroup>
			</div>
			{spread.notes
				?.split('\n')
				.filter(Boolean)
				.map((line) => (
					<p key={line} className="text-content4 text-sm">
						{line.trim()}
					</p>
				))}
		</header>
	);
}

function SpreadHeaderEdit() {
	const { spread, set, issues, disable, save, dirty, toggleEditing } =
		useEditSpread();
	return (
		<header>
			<Input
				value={spread.name}
				onValueChange={set('name')}
				placeholder="Spread name"
				isRequired
				classNames={{
					inputWrapper: 'h-8',
				}}
				isInvalid={!!issues('name')}
				errorMessage={issues('name')}
			/>
			<Textarea
				value={spread.notes ?? ''}
				onValueChange={set('notes')}
				placeholder="Notes"
				fullWidth
				className="my-4"
				isInvalid={!!issues('notes')}
				errorMessage={issues('notes')}
			/>
			<div className="flex flex-nowrap gap-4 items-center">
				<DatePicker
					onPick={set('date')}
					isIconOnly={false}
					isDisabled={disable}
					color={!!issues('date') ? 'danger' : 'default'}
				>
					<FontAwesomeIcon icon={faCalendar} />
					{displayDate(spread.date)}
				</DatePicker>
				<ButtonGroup isDisabled={disable} className="grow justify-end">
					<Button
						onPress={save}
						isLoading={disable}
						color="success"
						isDisabled={!dirty}
						isIconOnly
					>
						<FontAwesomeIcon icon={faSave} />
					</Button>
					<Button onPress={toggleEditing} color="danger" isIconOnly>
						<FontAwesomeIcon icon={faCancel} />
					</Button>
				</ButtonGroup>
			</div>
			{issues('date') && <p className="text-red-500">{issues('date')}</p>}
		</header>
	);
}
