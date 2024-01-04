import { Button, Card, CardHeader, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CardPicker from 'components/card-picker';
import Page from 'components/page';
import UploadControls from 'components/upload';
import { AnyCard } from 'lib/cards/constants';
import { TarotCard } from 'lib/cards/types';
import { displayCase } from 'lib/text';

export default function NewSpreadPage() {
	const [date, setDate] = useState(new Date().toDateString());
	const [cards, setCards] = useState<AnyCard[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const clear = () => {
		setErrorMessage(null);
	};

	const addCard = (card: TarotCard) => {
		setCards((positions) => [...positions, card.name]);
		clear();
	};
	const router = useRouter();
	const save = () => {
		router.push('/spreads/2020-01-01-1');
	};
	return (
		<Page>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			<Input
				fullWidth
				type="text"
				name="date"
				label="Date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<UploadControls />
			<section className="grid grid-cols-2 gap-4 grow">
				{cards.map((card) => (
					<Card key={card} className="h-full">
						<Button
							color="danger"
							className="absolute top-0 right-0"
						>
							X
						</Button>
						<CardHeader>{displayCase(card)}</CardHeader>
					</Card>
				))}
			</section>
			{cards.length > 0 && (
				<Button color="success" onPress={save}>
					Start Writing
				</Button>
			)}
			<CardPicker color="primary" onPick={addCard} disabledCards={cards}>
				Add Card
			</CardPicker>
		</Page>
	);
}
