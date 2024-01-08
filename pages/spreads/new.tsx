import { faCalendar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardHeader } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CancelButton from 'components/buttons/cancel';
import CardPicker from 'components/card-picker';
import Page from 'components/page';
import UploadControls from 'components/upload';
import { isTarotCard } from 'lib/cards/utils';
import { mutateCreateSpread } from 'lib/spreads/api';
import { displayCase } from 'lib/text';

import type { AnyCard } from 'lib/cards/constants';
import type { GenericCard } from 'lib/cards/types';

export default function NewSpreadPage() {
	const [cards, setCards] = useState<AnyCard[]>([]);
	const [photo, setPhoto] = useState<Blob | null>(null);
	const router = useRouter();
	const saveSpread = useMutation({
		mutationFn: () =>
			mutateCreateSpread({ cards, date: new Date() }, photo),
		onSuccess: ({ spreadId }) => {
			router.push(`/spreads/${spreadId}`);
		},
	});
	const disable = saveSpread.isPending || saveSpread.isSuccess;

	const addCard = (card: GenericCard) => {
		if (isTarotCard(card)) {
			setCards((positions) => [...positions, card.name]);
		}
	};
	return (
		<Page>
			{saveSpread.isError && (
				<p className="text-red-500">
					Error: {saveSpread.error.message}
				</p>
			)}
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
					onPress={() => saveSpread.mutate()}
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
