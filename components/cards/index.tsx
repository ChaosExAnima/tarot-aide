import { Card, CardBody, Textarea } from '@nextui-org/react';
import { useState } from 'react';

import { BaseSpreadPosition } from 'lib/spreads/types';

import OracleCardHeader from './header';

export interface OracleCardProps {
	onSave?: (spread: BaseSpreadPosition) => void;
	spread: BaseSpreadPosition;
	template?: boolean;
	editable?: boolean;
}

export default function OracleCard(props: OracleCardProps) {
	const { spread, editable = true, template = false } = props;
	const [editNotes, setEditNotes] = useState(spread?.notes ?? '');

	return (
		<Card className="w-full">
			<OracleCardHeader {...props} />
			{!template && spread.card && (
				<CardBody>
					{editable && (
						<Textarea
							minRows={1}
							placeholder="Notes go here"
							value={editNotes}
							onValueChange={setEditNotes}
						/>
					)}
					{!editable && spread.notes}
				</CardBody>
			)}
		</Card>
	);
}
