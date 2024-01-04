import { Button, ButtonProps, Card, CardBody } from '@nextui-org/react';
import { ReactNode, useState } from 'react';

import { AllSuitsWithMajor, AnyCard, SuitWithMajor } from 'lib/cards/constants';
import { TarotCard } from 'lib/cards/types';
import { getCardsFromSuit } from 'lib/cards/utils';
import { displayCase } from 'lib/text';

interface CardPickerProps extends ButtonProps {
	children: ReactNode;
	onPick: (_: TarotCard) => void;
	disabledCards?: AnyCard[];
}

export default function CardPicker({
	children,
	onPick,
	disabledCards,
	...props
}: CardPickerProps) {
	const [showing, setShowing] = useState(false);
	const [suit, setSuit] = useState<null | SuitWithMajor>(null);
	const toggleShowing = () => {
		setShowing((showing) => !showing);
		setSuit(null);
	};
	const select = (card: TarotCard) => {
		onPick(card);
		setShowing(false);
		setSuit(null);
	};
	if (!showing) {
		return (
			<Button {...props} onClick={toggleShowing}>
				{children}
			</Button>
		);
	}
	return (
		<>
			<Card>
				<CardBody
					className={`grid ${
						!suit ? 'grid-cols-1' : 'grid-cols-3'
					} gap-4 w-full my-2`}
				>
					{!suit &&
						AllSuitsWithMajor.map((suitName) => (
							<Button
								key={suitName}
								onClick={() => setSuit(suitName)}
							>
								{displayCase(suitName)}
							</Button>
						))}
					{suit &&
						getCardsFromSuit(suit).map((card) => (
							<Button
								key={card.name}
								onClick={() => select(card)}
								disabled={disabledCards?.includes(card.name)}
								fullWidth
							>
								{displayCase(card.name)}
							</Button>
						))}
				</CardBody>
			</Card>
			<Button onClick={toggleShowing}>{children}</Button>
		</>
	);
}
