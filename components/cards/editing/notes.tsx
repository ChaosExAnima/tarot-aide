import { CardBody, Textarea } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ReferencesModal from 'components/references-modal';
import { queryCardReferences } from 'lib/cards/api';

import { OracleCardEditingProps } from './index';

import type { GenericCard } from 'lib/cards/types';
import type { Nullable } from 'lib/types';

export default function OracleCardNotesEditable({
	spread,
	onSave,
	card,
}: OracleCardEditingProps & { card: Nullable<GenericCard> }) {
	const notes = spread?.notes ?? '';
	const [editNotes, setEditNotes] = useState(notes);

	const { data: cardRefs } = useQuery({
		queryKey: ['cards', 'references', card?.name, spread.reversed ?? false],
		queryFn: () => queryCardReferences(card!.name, spread.reversed),
		enabled: !!card,
	});
	const handleNotesChange = (newNotes: string) => {
		setEditNotes(newNotes);
		onSave({
			...spread,
			notes: newNotes,
		});
	};

	return (
		<CardBody className="gap-0">
			<Textarea
				minRows={1}
				placeholder="Notes go here"
				value={editNotes}
				onValueChange={handleNotesChange}
			/>
			<div className="overflow-hidden transition-height delay-700 h-0 group-focus-within:h-14 group-focus-within:delay-0">
				<div className="mt-4 flex gap-4 items-center">
					{!!cardRefs && (
						<p className="grow text-content4 text-sm">
							{cardRefs.references
								.find((r) => r.id === cardRefs.defaultReference)
								?.keywords.join(', ')}
						</p>
					)}
					{card && (
						<ReferencesModal
							card={card}
							reversed={spread.reversed}
						/>
					)}
				</div>
			</div>
		</CardBody>
	);
}
