import { faCalendar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardHeader } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CancelButton from 'components/buttons/cancel';
import CardPicker from 'components/card-picker';
import Page from 'components/page';
import UploadControls from 'components/upload';
import { AnyCard } from 'lib/cards/constants';
import { TarotCard } from 'lib/cards/types';
import { displayCase } from 'lib/text';

export default function NewSpreadPage() {
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
			<section className="flex gap-4 items-center justify-end">
				<Button isIconOnly aria-label="Set date">
					<FontAwesomeIcon icon={faCalendar} />
				</Button>
				<Button
					isIconOnly
					color="danger"
					aria-label="Cancel new spread"
				>
					<FontAwesomeIcon icon={faXmark} />
				</Button>
			</section>
			<UploadControls />
			<section className="grid grid-cols-2 gap-4 grow">
				{cards.map((card) => (
					<Card key={card} className="h-full">
						<CancelButton className="absolute top-1 right-1 w-6 h-6 min-w-0" />
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
