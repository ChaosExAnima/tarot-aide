import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CardHeader, Input } from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';

import SaveButton from 'components/buttons/save';
import CardPicker from 'components/card-picker';
import CardsIcon from 'components/icons/cards';
import { displayCardFullName, displayCardShortName } from 'lib/cards/utils';

import type { OracleCardProps } from './index';

export default function OracleCardHeader({
	spread,
	editable = true,
	template = false,
}: OracleCardProps) {
	const [editing, setEditing] = useState(!spread?.name && editable);

	if (editing) {
		return (
			<OracleCardHeaderEditing
				spread={spread}
				template={template}
				onSave={() => setEditing(false)}
			/>
		);
	}

	const card = spread.card;
	const title = card ? displayCardFullName(card) : spread?.name ?? '';
	const subTitle = !!card && spread?.name;

	return (
		<CardHeader className="gap-2 flex-nowrap">
			<div className="flex-grow">
				{title}
				{subTitle && (
					<span className="text-content4 ml-2">{subTitle}</span>
				)}
			</div>
			{editable && (
				<Button
					isIconOnly
					variant="light"
					className="rounded-full text-content4"
					onPress={() => setEditing(true)}
				>
					<FontAwesomeIcon icon={faEdit} />
				</Button>
			)}
		</CardHeader>
	);
}

function OracleCardHeaderEditing({
	spread,
	onSave,
	template,
}: OracleCardProps) {
	const [editName, setEditName] = useState(spread?.name ?? '');
	const [card, setCard] = useState(spread?.card ?? null);
	const saveHandler = () => {
		if (!editName || (!card && !template)) {
			return;
		}
		onSave &&
			onSave({
				...spread,
				name: editName,
				card,
			});
	};
	return (
		<CardHeader className="gap-2">
			{!template && (
				<CardPicker
					onPick={setCard}
					disabledCards={card ? [card.name] : []}
					isIconOnly={!card}
					className={clsx('bg-default-100 hover:bg-default-200')}
				>
					{card ? displayCardShortName(card) : <CardsIcon />}
				</CardPicker>
			)}
			<Input
				value={editName}
				placeholder="Position name"
				onValueChange={setEditName}
				size="sm"
				classNames={{
					inputWrapper: clsx('h-10 rounded-medium'),
				}}
			/>
			<SaveButton
				onPress={saveHandler}
				isDisabled={!editName || (!card && !template)}
			/>
		</CardHeader>
	);
}
