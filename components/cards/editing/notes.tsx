import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	ButtonGroup,
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

export default function OracleCardNotesEditable({
	spread,
	onSave,
}: OracleCardEditingProps) {
	const notes = spread?.notes ?? '';
	const [inFocus, setInFocus] = useState(false);
	const [editNotes, setEditNotes] = useState(notes);

	const [showRefs, setShowRefs] = useState(false);
	const { data, isLoading } = useQuery({
		queryKey: ['cards', 'references', spread.card?.name],
		queryFn: () =>
			queryCardReferences(spread.card!.name, spread.reversed, 1),
		enabled: !!spread.card,
	});
	const handleNotesChange = (newNotes: string) => {
		setEditNotes(newNotes);
		onSave({
			...spread,
			notes: newNotes,
		});
	};

	return (
		<CardBody className="gap-4">
			<Textarea
				minRows={1}
				placeholder="Notes go here"
				value={editNotes}
				onValueChange={handleNotesChange}
				onFocus={() => setInFocus(true)}
				onBlur={() => setInFocus(false)}
			/>
			{spread.card && (
				<Modal
					isOpen={showRefs}
					onOpenChange={setShowRefs}
					placement="top-center"
					backdrop="blur"
					classNames={{
						wrapper: 'top-10',
					}}
				>
					<ModalContent>
						<ModalHeader>
							References for {displayCardFullName(spread.card)}
						</ModalHeader>
						<ModalBody>
							<CardReferences card={spread.card} />
						</ModalBody>
					</ModalContent>
				</Modal>
			)}

			{inFocus && (
				<div className="flex items-center">
					{!!data && (
						<p className="grow text-content4 text-sm">
							{data.references[0].keywords.slice(0, 3).join(', ')}
						</p>
					)}
					<ButtonGroup>
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
					</ButtonGroup>
				</div>
			)}
		</CardBody>
	);
}
