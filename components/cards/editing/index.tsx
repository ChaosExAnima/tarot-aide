import { Card } from '@nextui-org/react';
import { useState } from 'react';

import OracleCardHeader from './header';
import OracleCardNotes from './notes';

import type { OracleCardBaseProps } from '../types';
import type { BaseSpreadPosition } from 'lib/spreads/types';

export interface OracleCardEditingProps extends OracleCardBaseProps {
	onSave: (spread: BaseSpreadPosition) => void;
	isCardAllowed?: boolean;
}

export default function OracleCardEditing(props: OracleCardEditingProps) {
	const [card, setCard] = useState(props.spread.card ?? null);
	return (
		<Card className="w-full group">
			<OracleCardHeader {...props} card={card} setCard={setCard} />
			<OracleCardNotes {...props} card={card} />
		</Card>
	);
}
