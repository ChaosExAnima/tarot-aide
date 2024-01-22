import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

import { displayCardFullName } from 'lib/cards/utils';

import { OracleCardBaseProps } from '../types';

export default function OracleCardStatic({
	spread: { card, notes, name: spreadName, reversed },
}: OracleCardBaseProps) {
	const title = card ? displayCardFullName(card) : spreadName ?? '';
	const subTitle = !!card && spreadName;
	return (
		<Card className="w-full">
			<CardHeader className="gap-2 flex-nowrap">
				<div className="flex-grow">
					{title}
					{subTitle && (
						<span className="text-content4 ml-2">{subTitle}</span>
					)}
				</div>
				{reversed && <span className="text-content4">Reversed</span>}
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
