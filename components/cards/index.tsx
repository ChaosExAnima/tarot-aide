import { Card, CardBody, CardHeader, Textarea } from '@nextui-org/react';

import { GenericCard } from 'lib/cards/types';
import { BaseSpreadPosition } from 'lib/spreads/types';
import { displayCase } from 'lib/text';

type CardProps =
	| {
			card: GenericCard;
	  }
	| {
			spread: BaseSpreadPosition;
	  };

export default function OracleCard(props: CardProps) {
	const card = 'card' in props ? props.card : props.spread.card;
	const spread = 'spread' in props ? props.spread : null;
	return (
		<Card>
			<CardHeader className="gap-2">
				{card && displayCase(card.name)}
				{spread && <span className="text-content4">{spread.name}</span>}
			</CardHeader>
			<CardBody>
				{spread && (
					<Textarea
						minRows={1}
						placeholder="Notes go here"
						value={spread.notes ?? ''}
					/>
				)}
			</CardBody>
		</Card>
	);
}
