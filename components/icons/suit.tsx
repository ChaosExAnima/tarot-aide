import CupsIcon from './cups';
import MajorArcanaIcon from './major';
import PentaclesIcon from './pentacles';
import SwordsIcon from './swords';
import WandsIcon from './wands';

import type { SuitWithMajor } from 'lib/cards/constants';
import type { ClassNameProps } from 'lib/types';

export default function SuitIcon({
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
