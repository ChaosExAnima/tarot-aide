import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardBody, Textarea } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ConfirmationModal from 'components/confirmation-modal';
import ReferencesModal from 'components/references/modal';
import { queryCardReferences } from 'lib/cards/api';

import { OracleCardEditingProps } from './index';

import type { GenericCard } from 'lib/cards/types';
import type { Nullable } from 'lib/types';

export default function OracleCardNotesEditable({
	position,
	onSave,
	onDelete,
	card,
}: OracleCardEditingProps & { card: Nullable<GenericCard> }) {
	const notes = position?.notes ?? '';
	const [editNotes, setEditNotes] = useState(notes);

	const { data: cardRefs } = useQuery({
		queryKey: [
			'cards',
			'references',
			card?.name,
			position.reversed ?? false,
		],
		queryFn: () => queryCardReferences(card!.name, position.reversed),
		enabled: !!card,
	});
	const handleNotesChange = (newNotes: string) => {
		setEditNotes(newNotes);
		onSave({
			...position,
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
							reversed={position.reversed}
						/>
					)}
					{onDelete && (
						<ConfirmationModal
							onConfirm={() => onDelete(position)}
							isIconOnly
							body="This will permanently delete this position."
						>
							<FontAwesomeIcon icon={faTrash} />
						</ConfirmationModal>
					)}
				</div>
			</div>
		</CardBody>
	);
}
