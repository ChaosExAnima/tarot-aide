import { faWandMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ClassNameProps } from 'lib/types';

export default function WandsIcon({ className }: ClassNameProps) {
	return <FontAwesomeIcon icon={faWandMagic} className={className} />;
}
