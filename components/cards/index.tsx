import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	Textarea,
} from '@nextui-org/react';
import { useState } from 'react';

import { BaseSpreadPosition } from 'lib/spreads/types';
import { displayCase } from 'lib/text';

interface CardProps {
	onSave?: () => void;
	spread: BaseSpreadPosition;
}

export default function OracleCard({ spread }: CardProps) {
	const card = spread.card;
	const [editName, setEditName] = useState(spread?.name ?? '');
	const [editNotes, setEditNotes] = useState(spread?.notes ?? '');

	const title = card ? displayCase(card.name) : spread?.name ?? '';
	const subTitle = !!card && spread?.name;

	return (
		<Card className="w-full">
			<CardHeader className="gap-2">
				{title}
				{subTitle && <span className="text-content4">{subTitle}</span>}
				{!spread.name && (
					<Input
						value={editName}
						placeholder="Position name"
						onValueChange={setEditName}
						endContent={
							editName && (
								<Button
									isIconOnly
									color="success"
									variant="light"
								>
									<FontAwesomeIcon icon={faSave} size="xl" />
								</Button>
							)
						}
					/>
				)}
			</CardHeader>
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
