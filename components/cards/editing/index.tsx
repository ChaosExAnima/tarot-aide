import { Card } from '@nextui-org/react';

import OracleCardHeader from './header';
import OracleCardNotes from './notes';

import type { OracleCardBaseProps } from '../types';
import type { BaseSpreadPosition } from 'lib/spreads/types';

export interface OracleCardEditingProps extends OracleCardBaseProps {
	onSave?: (spread: BaseSpreadPosition) => void;
	isCardAllowed?: boolean;
}

export default function OracleCardEditing(props: OracleCardEditingProps) {
	return (
		<Card className="w-full">
			<OracleCardHeader {...props} />
			<OracleCardNotes {...props} />
		</Card>
	);
}
