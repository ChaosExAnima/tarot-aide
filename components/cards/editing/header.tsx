import { CardHeader, Checkbox, Input } from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';

import CardName from 'components/card-name';
import CardPicker from 'components/card-picker';
import CardsIcon from 'components/icons/cards';
import { GenericCard } from 'lib/cards/types';

import { OracleCardEditingProps } from './index';

export default function OracleCardHeaderEditing({
	spread,
	onSave,
	isCardAllowed = true,
	card,
	setCard,
}: OracleCardEditingProps & {
	card: GenericCard | null;
	setCard: (card: GenericCard | null) => void;
}) {
	const [editName, setEditName] = useState(spread.name ?? '');
	const [reversed, setReversed] = useState(spread.reversed ?? false);
	const nameChangeHandler = (newName: string) => {
		setEditName(newName);
		if (!newName || (!card && !isCardAllowed)) {
			return;
		}
		onSave({
			...spread,
			name: newName,
			card,
		});
	};
	const reversedChangeHandler = (newReversed: boolean) => {
		setReversed(newReversed);
		onSave({
			...spread,
			reversed: newReversed,
		});
	};
	return (
		<CardHeader className="gap-2 pb-0">
			{isCardAllowed && (
				<CardPicker
					onPick={setCard}
					disabledCards={card ? [card.name] : []}
					isIconOnly={!card}
					className={clsx(
						'bg-default-100 hover:bg-default-200',
						!!card && 'w-40',
					)}
				>
					{card ? <CardName card={card} short icon /> : <CardsIcon />}
				</CardPicker>
			)}
			<Input
				value={editName}
				placeholder="Position name"
				onValueChange={nameChangeHandler}
				size="sm"
				isRequired
				classNames={{
					inputWrapper: clsx('h-10 rounded-medium'),
				}}
			/>
			{isCardAllowed && (
				<Checkbox
					isSelected={reversed}
					onValueChange={reversedChangeHandler}
				>
					Reversed
				</Checkbox>
			)}
		</CardHeader>
	);
}
