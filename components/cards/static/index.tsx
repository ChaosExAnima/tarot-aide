import { Card, CardBody, CardHeader } from '@nextui-org/react';

import { displayCardFullName } from 'lib/cards/utils';

import { OracleCardBaseProps } from '../types';

export default function OracleCardStatic({
	spread: { card, notes, name: spreadName },
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
			</CardHeader>
			{notes && <CardBody className="gap-4">{notes}</CardBody>}
		</Card>
	);
}
