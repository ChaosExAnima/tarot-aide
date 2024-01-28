import { Button } from '@nextui-org/react';

import OracleCardEditing from 'components/cards/editing';

import type { FilledSpreadPosition } from 'lib/spreads/types';

interface EditSpreadListProps {
	positions: FilledSpreadPosition[];
	onUpdate: (positions: FilledSpreadPosition[]) => void;
	isDraggable?: boolean;
}

export default function EditSpreadList({
	positions,
	onUpdate,
}: EditSpreadListProps) {
	const updatePosition = (updatedPosition: FilledSpreadPosition) => {
		const newPositions = positions.map((position) =>
			position.id === updatedPosition.id ? updatedPosition : position,
		);
		onUpdate(newPositions);
	};
	return (
		<>
			{positions.map((position) => (
				<OracleCardEditing
					key={position.id}
					spread={position}
					onSave={updatePosition}
				/>
			))}
			<Button>Add new card</Button>
		</>
	);
}
