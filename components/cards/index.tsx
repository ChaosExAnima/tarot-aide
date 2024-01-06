import { Card, CardBody, Textarea } from '@nextui-org/react';
import { useState } from 'react';

import { BaseSpreadPosition } from 'lib/spreads/types';

import OracleCardHeader from './header';

interface OracleCardProps {
	onSave?: () => void;
	spread: BaseSpreadPosition;
}

export default function OracleCard({ spread }: OracleCardProps) {
	const [editNotes, setEditNotes] = useState(spread?.notes ?? '');

	return (
		<Card className="w-full">
			<OracleCardHeader spread={spread} />
			{spread.card && (
				<CardBody>
					<Textarea
						minRows={1}
						placeholder="Notes go here"
						value={editNotes}
						onValueChange={setEditNotes}
					/>
				</CardBody>
			)}
		</Card>
	);
}
