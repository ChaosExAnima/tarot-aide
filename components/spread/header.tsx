import {
	faCalendar,
	faCancel,
	faEdit,
	faSave,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Button, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import router from 'next/router';
import { useState } from 'react';

import ConfirmationModal from 'components/confirmation-modal';
import DatePicker from 'components/date-picker';
import { mutateDeleteSpread, mutateUpdateSpread } from 'lib/spreads/api';
import { displaySpreadName } from 'lib/spreads/utils';
import { displayDate } from 'lib/text';

import type { ExistingSpread } from 'lib/spreads/types';

interface SpreadHeaderProps {
	spread: ExistingSpread;
}

export default function SpreadHeader(props: SpreadHeaderProps) {
	const { spread } = props;
	const [editing, setEditing] = useState(false);
	const deleteSpread = useMutation({
		mutationFn: () => mutateDeleteSpread(spread.id),
		onSuccess: () => router.push('/spreads'),
	});
	if (editing) {
		return (
			<SpreadHeaderEdit {...props} onComplete={() => setEditing(false)} />
		);
	}

	return (
		<header>
			<div className="flex flex-nowrap gap-4 items-center">
				<h1 className="grow font-bold text-2xl">
					{displaySpreadName(spread)}
				</h1>
				<ButtonGroup isDisabled={deleteSpread.isPending}>
					<Button
						onPress={() => setEditing(true)}
						color="primary"
						isIconOnly
					>
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
			{spread.description && <h2>{spread.description}</h2>}
		</header>
	);
}

function SpreadHeaderEdit({
	spread: initial,
	onComplete,
}: SpreadHeaderProps & { onComplete: () => void }) {
	const [spread, setSpread] = useState(initial);
	const [dirty, setDirty] = useState(false);
	const changeFactory =
		<Key extends keyof ExistingSpread>(key: Key) =>
		(value: ExistingSpread[Key]) =>
			setSpread((spread) => {
				setDirty(true);
				return { ...spread, [key]: value };
			});
	const updateSpread = useMutation({
		mutationFn: () =>
			mutateUpdateSpread(initial.id, {
				...spread,
				positions: spread.positions.map((pos) => ({
					...pos,
					card: pos.card?.name,
					notes: pos.notes ?? null,
				})),
			}),
		onSettled: () => onComplete(),
	});
	return (
		<header>
			<Input
				value={spread.name}
				onValueChange={changeFactory('name')}
				placeholder="Spread name"
				isRequired
				classNames={{
					inputWrapper: 'h-8',
				}}
			/>
			<Input
				value={spread.description ?? ''}
				onValueChange={changeFactory('description')}
				placeholder="Description"
				classNames={{
					mainWrapper: 'my-4',
				}}
			/>
			<div className="flex flex-nowrap gap-4 items-center">
				<DatePicker
					onPick={changeFactory('date')}
					isIconOnly={false}
					isDisabled={updateSpread.isPending}
				>
					<FontAwesomeIcon icon={faCalendar} />
					{displayDate(spread.date)}
				</DatePicker>
				<ButtonGroup
					isDisabled={updateSpread.isPending}
					className="grow justify-end"
				>
					<Button
						onPress={() => updateSpread.mutate()}
						color="success"
						isDisabled={!dirty}
						isIconOnly
					>
						<FontAwesomeIcon icon={faSave} />
					</Button>
					<Button onPress={onComplete} color="danger" isIconOnly>
						<FontAwesomeIcon icon={faCancel} />
					</Button>
				</ButtonGroup>
			</div>
		</header>
	);
}
