import { faMagnifyingGlass, faSave } from '@fortawesome/free-solid-svg-icons';
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
			<div className="flex flex-row gap-2">
				<Textarea
					minRows={1}
					placeholder="Notes go here"
					value={editNotes}
					onValueChange={setEditNotes}
				/>
				{spread.card && (
					<Button
						isIconOnly
						onPress={() => setShowRefs(true)}
						isLoading={isLoading}
						isDisabled={isLoading}
					>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</Button>
				)}
			</div>
			{spread.card && (
				<Modal
					isOpen={showRefs}
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
				<ButtonGroup className="justify-end">
					<Button isIconOnly>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</Button>
					<Button color="success" isIconOnly>
						<FontAwesomeIcon icon={faSave} />
					</Button>
				</ButtonGroup>
			)}
		</>
	);
}
