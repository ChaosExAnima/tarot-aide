import { Card } from '@nextui-org/react';
import { useState } from 'react';

import { GenericCard } from 'lib/cards/types';

import OracleCardHeader from './header';
import OracleCardNotes from './notes';

import type { OracleCardBaseProps } from '../types';
import type { SpreadPosition } from 'lib/spreads/types';

export interface OracleCardEditingProps extends OracleCardBaseProps {
	spreadId: number;
	onSave: (spread: SpreadPosition) => void;
	onDelete?: (spread: SpreadPosition) => void;
	isCardAllowed?: boolean;
}

export default function OracleCardEditing(props: OracleCardEditingProps) {
	const [card, setCard] = useState<null | GenericCard>(
		props.position.card ?? null,
	);
	return (
		<Card className="w-full group">
			<OracleCardHeader {...props} card={card} setCard={setCard} />
			<OracleCardNotes {...props} card={card} />
		</Card>
	);
}
