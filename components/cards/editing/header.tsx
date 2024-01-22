import { CardHeader, Input } from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';

import CardName from 'components/card-name';
import CardPicker from 'components/card-picker';
import CardsIcon from 'components/icons/cards';

import { OracleCardEditingProps } from './index';

export default function OracleCardHeaderEditing({
	spread,
	onSave,
	isCardAllowed = true,
}: OracleCardEditingProps) {
	const [editName, setEditName] = useState(spread?.name ?? '');
	const [card, setCard] = useState(spread?.card ?? null);
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
	return (
		<CardHeader className="gap-2">
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
		</CardHeader>
	);
}
