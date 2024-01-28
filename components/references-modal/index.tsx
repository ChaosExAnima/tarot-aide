import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Button,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { CardReferences } from 'components/cards/references';
import { queryCardReferences } from 'lib/cards/api';
import { displayCardFullName } from 'lib/cards/utils';

import type { GenericCard } from 'lib/cards/types';
import type { Nullable } from 'lib/types';

export default function ReferencesModal({
	card,
	reversed = false,
}: {
	card?: Nullable<GenericCard>;
	reversed?: boolean;
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { data: cardRefs } = useQuery({
		queryKey: ['cards', 'references', card!.name, reversed ?? false],
		queryFn: () => queryCardReferences(card!.name, reversed),
		enabled: !!card,
	});
	if (!card) {
		return null;
	}
	return (
		<>
			<Button isIconOnly onPress={onOpen}>
				<FontAwesomeIcon icon={faQuestion} />
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
				backdrop="blur"
				classNames={{
					wrapper: 'top-10',
					base: 'bg-transparent shadow-none rounded-none gap-0',
					body: 'p-0',
					header: 'bg-content1 rounded-xl shadow-medium mx-2 mb-4',
					closeButton: 'top-[calc(30px-(1em))] right-4',
				}}
			>
				<ModalContent>
					<ModalHeader>
						References for {displayCardFullName(card)}
						{reversed && ' (reversed)'}
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
		</>
	);
}
