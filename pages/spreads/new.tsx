import { Button, Card, CardHeader, Input } from '@nextui-org/react';
import { useState } from 'react';

import CardPicker from 'components/card-picker';
import Page from 'components/page';
import { AnyCard } from 'lib/cards/constants';
import { TarotCard } from 'lib/cards/types';
import { FilledSpreadPosition } from 'lib/spreads/types';

export default function NewSpreadPage() {
	const [date, setDate] = useState(new Date().toDateString());
	const [positions, setPositions] = useState<FilledSpreadPosition[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const clear = () => {
		setErrorMessage(null);
	};

	const addCard = (card: TarotCard) => {
		setPositions((positions) => [...positions, { card, position: '' }]);
		clear();
	};
	return (
		<Page>
			<Input
				type="text"
				name="date"
				label="Date"
				fullWidth
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<section className="grid grid-cols-2 gap-4 grow">
				{positions.map((position) => (
					<Card key={position.card.name} className="h-full">
						<Button
							color="danger"
							className="absolute top-0 right-0"
						>
							X
						</Button>
						<CardHeader>{position.card.name}</CardHeader>
					</Card>
				))}
			</section>
			{positions.length > 0 && <Button color="success">Save</Button>}
			<CardPicker
				onPick={addCard}
				disabledCards={positions.map(
					(position) => position.card.name as AnyCard,
				)}
			>
				Add Card
			</CardPicker>
		</Page>
	);
}
