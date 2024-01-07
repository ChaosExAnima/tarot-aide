import { ReactNode } from 'react';

import { GenericCard } from 'lib/cards/types';
import {
	displayCardFullName,
	displayCardShortName,
	isMajorTarotCard,
	isMinorTarotCard,
} from 'lib/cards/utils';
import { displayCase } from 'lib/text';

import CupsIcon from '../icons/cups';
import MajorArcanaIcon from '../icons/major';
import PentaclesIcon from '../icons/pentacles';
import SwordsIcon from '../icons/swords';
import WandsIcon from '../icons/wands';

import type { SuitWithMajor } from 'lib/cards/constants';
import type { ClassNameProps } from 'lib/types';

export function SuitIcon({
	suit,
	className,
}: { suit: SuitWithMajor } & ClassNameProps) {
	switch (suit) {
		case 'major':
			return <MajorArcanaIcon className={className} />;
		case 'cups':
			return <CupsIcon className={className} />;
		case 'pentacles':
			return <PentaclesIcon className={className} />;
		case 'swords':
			return <SwordsIcon className={className} />;
		case 'wands':
			return <WandsIcon className={className} />;
	}
}

interface CardNameProps {
	card: GenericCard;
	short?: boolean;
	icon?: boolean;
}

export function CardName({
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
