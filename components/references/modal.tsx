import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Button,
	ButtonProps,
} from '@nextui-org/react';

import ReferencesList from 'components/references/list';
import { displayCardFullName } from 'lib/cards/utils';

import type { GenericCard } from 'lib/cards/types';
import type { Nullable } from 'lib/types';

export default function ReferencesModal({
	card,
	reversed = false,
	...props
}: {
	card?: Nullable<GenericCard>;
	reversed?: boolean;
} & ButtonProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	if (!card) {
		return null;
	}
	return (
		<>
			<Button isIconOnly {...props} onPress={onOpen}>
				<FontAwesomeIcon icon={faQuestion} />
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
				backdrop="blur"
				scrollBehavior="inside"
				classNames={{
					wrapper: 'overflow-hidden',
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
						<ReferencesList card={card} reversed={reversed} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
