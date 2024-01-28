import CardPicker from 'components/card-picker';
import OracleCardEditing from 'components/cards/editing';
import { GenericCard } from 'lib/cards/types';

import type { FilledSpreadPosition } from 'lib/spreads/types';

interface EditSpreadListProps {
	positions: FilledSpreadPosition[];
	onUpdate: (positions: FilledSpreadPosition[]) => void;
	isDisabled?: boolean;
}

export default function EditSpreadList({
	positions,
	onUpdate,
	isDisabled,
}: EditSpreadListProps) {
	const updatePosition = (updatedPosition: FilledSpreadPosition) => {
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
				disabledCards={positions.map(({ card }) => card.name)}
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
