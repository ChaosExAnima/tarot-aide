import { Card, CardBody } from '@nextui-org/react';

import { BaseSpreadPosition } from 'lib/spreads/types';

import OracleCardHeader from './header';
import OracleCardNotes from './notes';

export interface OracleCardProps {
	onSave?: (spread: BaseSpreadPosition) => void;
	spread: BaseSpreadPosition;
	template?: boolean;
	editable?: boolean;
}

export default function OracleCard(props: OracleCardProps) {
	const { spread, editable = true, template = false } = props;

	return (
		<Card className="w-full">
			<OracleCardHeader {...props} />
			{!template && spread.card && (
				<CardBody className="gap-4">
					{editable && <OracleCardNotes {...props} />}
					{!editable && spread.notes}
				</CardBody>
			)}
		</Card>
	);
}
