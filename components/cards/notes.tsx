import { faMagnifyingGlass, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Textarea } from '@nextui-org/react';
import { useState } from 'react';

import { OracleCardProps } from './index';

export default function OracleCardNotes({ spread }: OracleCardProps) {
	const notes = spread?.notes ?? '';
	const [editNotes, setEditNotes] = useState(notes);

	return (
		<>
			<Textarea
				minRows={1}
				placeholder="Notes go here"
				value={editNotes}
				onValueChange={setEditNotes}
			/>
			{notes !== editNotes && (
				<ButtonGroup className="justify-end">
					<Button isIconOnly>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</Button>
					<Button color="success" isIconOnly>
						<FontAwesomeIcon icon={faSave} />
					</Button>
				</ButtonGroup>
			)}
		</>
	);
}
