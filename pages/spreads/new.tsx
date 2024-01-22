import { faCalendar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CardPicker from 'components/card-picker';
import OracleCardStatic from 'components/cards/static';
import Page from 'components/page';
import UploadControls from 'components/upload';
import { mutateCreateSpread } from 'lib/spreads/api';

import type { GenericCard } from 'lib/cards/types';
import type { FilledSpreadPosition } from 'lib/spreads/types';

export default function NewSpreadPage() {
	const [positions, setPositions] = useState<FilledSpreadPosition[]>([]);
	const [photo, setPhoto] = useState<Blob | null>(null);
	const router = useRouter();
	const saveSpread = useMutation({
		mutationFn: () =>
			mutateCreateSpread(
				{
					cards: positions.map(({ card }) => card.name),
					date: new Date(),
				},
				photo,
			),
		onSuccess: ({ spreadId }) => {
			router.push(`/spreads/${spreadId}`);
		},
	});
	const disable = saveSpread.isPending || saveSpread.isSuccess;

	const addPosition = (card: GenericCard) => {
		setPositions((positions) => [...positions, { card }]);
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
			<section className="flex flex-col gap-4 grow">
				{positions.map((card) => (
					<OracleCardStatic key={card.name} spread={card} />
				))}
			</section>
			{positions.length > 0 && (
				<Button
					color="success"
					onPress={() => saveSpread.mutate()}
					isDisabled={disable}
				>
					Save and Continue
				</Button>
			)}
			<CardPicker
				color="primary"
				onPick={addPosition}
				disabledCards={positions.map(({ card }) => card.name)}
				isDisabled={disable}
			>
				Add Card
			</CardPicker>
		</Page>
	);
}
