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
