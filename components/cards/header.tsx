import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CardHeader, Input } from '@nextui-org/react';
import { useState } from 'react';

import CardPicker from 'components/card-picker';
import CardsIcon from 'components/icons/cards';
import { BaseSpreadPosition } from 'lib/spreads/types';
import { displayCase } from 'lib/text';

interface OracleCardHeaderProps {
	spread: BaseSpreadPosition;
	editable?: boolean;
}

export default function OracleCardHeader({
	spread,
	editable = true,
}: OracleCardHeaderProps) {
	const [editing, setEditing] = useState(!spread?.name);

	if (editing) {
		return (
			<OracleCardHeaderEditing
				spread={spread}
				onSave={() => setEditing(false)}
			/>
		);
	}

	const card = spread.card;
	const title = card ? displayCase(card.name) : spread?.name ?? '';
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
}: OracleCardHeaderProps & { onSave: () => void }) {
	const [editName, setEditName] = useState(spread?.name ?? '');
	const [card, setCard] = useState(spread?.card ?? null);
	return (
		<CardHeader className="gap-2">
			<CardPicker
				onPick={setCard}
				disabledCards={card ? [card.name] : []}
				isIconOnly={!card}
				className="bg-default-100 hover:bg-default-200"
			>
				{card ? displayCase(card.name) : <CardsIcon />}
			</CardPicker>
			<Input
				value={editName}
				placeholder="Position name"
				onValueChange={setEditName}
				size="sm"
				classNames={{ inputWrapper: 'h-10 rounded-medium' }}
			/>
			<Button
				isIconOnly
				color="success"
				variant="light"
				onPress={() => onSave()}
				className="rounded-full"
			>
				<FontAwesomeIcon icon={faSave} size="xl" />
			</Button>
		</CardHeader>
	);
}
