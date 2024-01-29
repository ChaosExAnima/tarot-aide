import { Card, CardBody, CardHeader, Divider, Link } from '@nextui-org/react';

import ReferencesModal from 'components/references/modal';
import { cardUrl, displayCardFullName } from 'lib/cards/utils';

import type { OracleCardBaseProps } from '../types';

export default function OracleCardStatic({
	position: { card, notes, name: spreadName, reversed },
}: OracleCardBaseProps) {
	return (
		<Card className="w-full">
			<CardHeader className="gap-3 flex-nowrap">
				<div className="flex-grow">
					{card && (
						<Link href={cardUrl(card.name, reversed)}>
							{displayCardFullName(card)}
						</Link>
					)}
					{spreadName && card ? (
						<span className="text-content4 ml-2">{spreadName}</span>
					) : (
						spreadName
					)}
				</div>
				{reversed && <span className="text-content4">Reversed</span>}
				<ReferencesModal card={card} reversed={reversed} />
			</CardHeader>
			{notes && <Divider />}
			{notes && (
				<CardBody className="gap-4">
					{notes
						.split('\n')
						.filter(Boolean)
						.map((line) => (
							<p key={line}>{line}</p>
						))}
				</CardBody>
			)}
		</Card>
	);
}
