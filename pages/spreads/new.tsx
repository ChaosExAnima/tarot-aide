import { Button, Card, CardHeader, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CancelButton from 'components/buttons/cancel';
import CardPicker from 'components/card-picker';
import Page from 'components/page';
import UploadControls from 'components/upload';
import { AnyCard } from 'lib/cards/constants';
import { TarotCard } from 'lib/cards/types';
import { SpreadResponseBody } from 'lib/spreads/api';
import { displayCase } from 'lib/text';

export default function NewSpreadPage() {
	const [date, setDate] = useState(new Date().toDateString());
	const [cards, setCards] = useState<AnyCard[]>([]);
	const [photo, setPhoto] = useState<Blob | null>(null);
	const router = useRouter();
	const saveSpread = useMutation({
		mutationFn: sendSpread,
		onSuccess: (spreadId) => {
			router.push(`/spreads/${spreadId}`);
		},
	});
	const disable = saveSpread.isPending || saveSpread.isSuccess;

	const addCard = (card: TarotCard) => {
		setCards((positions) => [...positions, card.name]);
	};
	return (
		<Page>
			{saveSpread.isError && (
				<p className="text-red-500">
					Error: {saveSpread.error.message}
				</p>
			)}
			<Input
				fullWidth
				type="text"
				label="Date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				isDisabled={disable}
			/>
			<UploadControls onSelect={setPhoto} isDisabled={disable} />
			<section className="grid grid-cols-2 gap-4 grow">
				{cards.map((card) => (
					<Card key={card} className="h-full">
						<CancelButton className="absolute top-1 right-1 w-6 h-6 min-w-0" />
						<CardHeader>{displayCase(card)}</CardHeader>
					</Card>
				))}
			</section>
			{cards.length > 0 && (
				<Button
					color="success"
					onPress={() => saveSpread.mutate({ date, cards, photo })}
					isDisabled={disable}
				>
					Start Writing
				</Button>
			)}
			<CardPicker
				color="primary"
				onPick={addCard}
				disabledCards={cards}
				isDisabled={disable}
			>
				Add Card
			</CardPicker>
		</Page>
	);
}

interface NewSpreadParams {
	date?: string;
	cards?: AnyCard[];
	photo: Blob | null;
}

async function sendSpread({ date, cards = [], photo }: NewSpreadParams) {
	const formData = new FormData();
	if (date) {
		formData.append('date', date);
	}
	cards.forEach((card) => formData.append('cards', card));
	if (photo) {
		formData.append('photo', photo);
	}
	const response = await fetch('/api/spread', {
		method: 'POST',
		body: formData,
	});
	const body: SpreadResponseBody = await response.json();
	if (!response.ok || !body.success) {
		throw new Error(body.message ?? 'Unknown error');
	}
	return body.spreadId;
}
