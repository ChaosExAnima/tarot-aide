import { ReactNode } from 'react';

import {
	displayCardFullName,
	displayCardShortName,
	isMajorTarotCard,
	isMinorTarotCard,
} from 'lib/cards/utils';
import { displayCase } from 'lib/text';

import SuitIcon from '../icons/suit';

import type { GenericCard } from 'lib/cards/types';

interface CardNameProps {
	card: GenericCard;
	short?: boolean;
	icon?: boolean;
}

export default function CardName({
	card,
	short = false,
	icon = false,
}: CardNameProps): ReactNode {
	if (!short) {
		return displayCardFullName(card);
	}
	if (isMajorTarotCard(card) || !isMinorTarotCard(card)) {
		return displayCase(card.name);
	}

	return (
		<>
			{displayCardShortName(card, true)}
			{icon && (
				<SuitIcon
					suit={card.suit}
					className="block mr-1 h-4 flex-shrink-0"
				/>
			)}
		</>
	);
}
