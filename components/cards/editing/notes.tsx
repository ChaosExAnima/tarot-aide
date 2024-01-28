import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	CardBody,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Textarea,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { queryCardReferences } from 'lib/cards/api';
import { displayCardFullName } from 'lib/cards/utils';

import { CardReferences } from '../references';

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

	const [showRefs, setShowRefs] = useState(false);
	const { data: cardRefs, isLoading } = useQuery({
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
					{spread.card && (
						<Button
							isIconOnly
							onPress={() => setShowRefs(true)}
							isLoading={isLoading}
							isDisabled={isLoading}
						>
							<FontAwesomeIcon icon={faQuestion} />
						</Button>
					)}
				</div>
			</div>

			{card && (
				<Modal
					isOpen={showRefs}
					onOpenChange={setShowRefs}
					placement="top-center"
					backdrop="blur"
					classNames={{
						wrapper: 'top-10',
						base: 'bg-transparent shadow-none rounded-none',
						body: 'px-0',
						header: 'bg-content1 rounded-xl shadow-medium mx-2',
						closeButton: 'top-[calc(30px-(1em))] right-4',
					}}
				>
					<ModalContent>
						<ModalHeader>
							References for {displayCardFullName(card)}
							{spread.reversed && ' (reversed)'}
						</ModalHeader>
						<ModalBody>
							<CardReferences
								card={{
									...card,
									...cardRefs,
								}}
							/>
						</ModalBody>
					</ModalContent>
				</Modal>
			)}
		</CardBody>
	);
}
