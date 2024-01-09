import { Input, InputProps } from '@nextui-org/react';
import clsx from 'clsx';
import { PropsWithChildren, useState } from 'react';

import SaveButton from 'components/buttons/save';

interface EditableHeaderProps {
	initial: string;
	onSave: (value: string) => void;
	classNames?: InputProps['classNames'] & { header?: string };
	isDisabled?: boolean;
}

export default function EditableHeader({
	initial,
	onSave,
	classNames,
	children,
	isDisabled,
}: PropsWithChildren<EditableHeaderProps>) {
	const [text, setText] = useState(initial);
	const [editing, setEditing] = useState(false);

	if (!editing) {
		return (
			<>
				<h1
					className={clsx(classNames?.header, 'grow')}
					onClick={() => setEditing(true)}
				>
					{text}
				</h1>
				{children}
			</>
		);
	}

	const handleSave = () => {
		onSave(text);
		setEditing(false);
	};

	return (
		<Input
			value={text}
			onValueChange={setText}
			classNames={classNames}
			endContent={<SaveButton onPress={handleSave} />}
			isDisabled={isDisabled}
		/>
	);
}
