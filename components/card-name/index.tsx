import { ReactNode } from 'react';

import SuitIcon from 'components/icons/suit';
import {
	displayCardFullName,
	displayCardShortName,
	isMajorTarotCard,
	isMinorTarotCard,
} from 'lib/cards/utils';

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
		return displayCardShortName(card, false);
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
