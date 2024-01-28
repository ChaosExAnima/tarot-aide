import CardPicker from 'components/card-picker';
import OracleCardEditing from 'components/cards/editing';
import { GenericCard } from 'lib/cards/types';

import type { SpreadPosition } from 'lib/spreads/types';

interface EditSpreadListProps {
	positions: SpreadPosition[];
	onUpdate: (positions: SpreadPosition[]) => void;
	isDisabled?: boolean;
}

export default function EditSpreadList({
	positions,
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
		onUpdate([...positions, { card }]);
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
					key={position.id}
					spread={position}
					onSave={updatePosition}
				/>
			))}
		</>
	);
}
