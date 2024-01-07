import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ClassNameProps } from 'lib/types';

export default function MajorArcanaIcon({ className }: ClassNameProps) {
	return <FontAwesomeIcon icon={faCrown} className={className} />;
}
