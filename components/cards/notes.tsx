import { faQuestion, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	ButtonGroup,
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

import CardReferenceDisplay from './reference';

import { OracleCardProps } from './index';

export default function OracleCardNotes({ spread }: OracleCardProps) {
	const notes = spread?.notes ?? '';
	const [editNotes, setEditNotes] = useState(notes);

	const [showRefs, setShowRefs] = useState(false);
	const { data, isLoading } = useQuery({
		queryKey: queryCardReferences.key([spread]),
		queryFn: () => queryCardReferences([spread]),
		enabled: !!spread.card,
	});

	return (
		<>
			<Textarea
				minRows={1}
				placeholder="Notes go here"
				value={editNotes}
				onValueChange={setEditNotes}
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
							{data?.references[spread.card.name].map((ref) => (
								<CardReferenceDisplay
									key={ref.text}
									cardRef={ref}
								/>
							))}
						</ModalBody>
					</ModalContent>
				</Modal>
			)}

			{notes !== editNotes && (
				<div className="flex items-center">
					<p className="grow text-content4 text-sm">
						{spread.card &&
							data?.references[spread.card.name][0].keywords
								.slice(0, 3)
								.join(', ')}
					</p>
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
						<Button color="success" isIconOnly>
							<FontAwesomeIcon icon={faSave} />
						</Button>
					</ButtonGroup>
				</div>
			)}
		</>
	);
}
