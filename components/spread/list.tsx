import OracleCardEditing from 'components/cards/editing';

import type { SpreadPosition } from 'lib/spreads/types';

interface SpreadListProps {
	positions: SpreadPosition[];
	onUpdate: (positions: SpreadPosition[]) => void;
	isDraggable?: boolean;
}

export default function SpreadList({ positions, onUpdate }: SpreadListProps) {
	const updatePosition = (updatedPosition: SpreadPosition) => {
		const newPositions = positions.map((position) =>
			position.id === updatedPosition.id ? updatedPosition : position,
		);
		onUpdate(newPositions);
	};
	return positions.map((position) => (
		<OracleCardEditing
			key={position.id}
			spread={position}
			onSave={updatePosition}
		/>
	));
}
