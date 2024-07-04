import CardPicker from 'components/card-picker';
import OracleCardEditing from 'components/cards/editing';
import { GenericCard } from 'lib/cards/types';

import type { ExistingSpread, SpreadPosition } from 'lib/spreads/types';

interface EditSpreadListProps {
	spread: ExistingSpread;
	onUpdate: (positions: SpreadPosition[]) => void;
	isDisabled?: boolean;
}

export default function EditSpreadList({
	spread: { id: spreadId, positions },
	onUpdate,
	isDisabled,
}: EditSpreadListProps) {
	const updatePosition = (updatedPosition: SpreadPosition) => {
		const newPositions = positions.map((position) =>
			position.id === updatedPosition.id ? updatedPosition : position,
		);
		onUpdate(newPositions);
	};
	const addPosition = (card: GenericCard) => {
		onUpdate([...positions, { card, id: positions.length * -1 }]);
	};
	const deletePosition = (position: SpreadPosition) => {
		onUpdate(positions.filter((p) => p.id !== position.id));
	};
	return (
		<>
			<CardPicker
				color="primary"
				onPick={addPosition}
				disabledCards={positions
					.map(({ card }) => card?.name)
					.filter((c): c is string => !!c)}
				isDisabled={isDisabled}
			>
				Add Card
			</CardPicker>
			{positions.map((position) => (
				<OracleCardEditing
					spreadId={spreadId}
					key={position.id}
					position={position}
					onSave={updatePosition}
					onDelete={deletePosition}
				/>
			))}
		</>
	);
}
