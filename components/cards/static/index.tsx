import { Card, CardBody, CardHeader } from '@nextui-org/react';

import { displayCardFullName } from 'lib/cards/utils';

import { OracleCardBaseProps } from '../types';

export default function OracleCardStatic({ spread }: OracleCardBaseProps) {
	const card = spread.card;
	const title = card ? displayCardFullName(card) : spread?.name ?? '';
	const subTitle = !!card && spread?.name;
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
			{spread.notes && (
				<CardBody className="gap-4">{spread.notes}</CardBody>
			)}
		</Card>
	);
}
