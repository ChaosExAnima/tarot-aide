import { Chip, Input, InputProps } from '@nextui-org/react';
import { useState, KeyboardEvent } from 'react';

interface TagPickerProps {
	tags?: string[];
	onChange: (tags: string[]) => void;
}

export default function TagPicker({
	tags: initialTags = [],
	onChange,
	...props
}: TagPickerProps & Omit<InputProps, 'onChange'>) {
	const [tagInput, setTagInput] = useState('');
	const [tags, setTags] = useState(initialTags);
	const handleTags = (cb: (tags: string[]) => string[]) => {
		setTags((tags) => {
			const newTags = cb(tags);
			onChange(newTags);
			return newTags;
		});
	};

	const handleKeywordChange = (tag: string) => {
		if (tag.endsWith(',')) {
			handleTags((tags) => [...tags, tag.slice(0, -1).trim()]);
			setTagInput('');
		} else {
			setTagInput(tag);
		}
	};
	const handleBackspace = (event: KeyboardEvent) => {
		if (event.key === 'Backspace' && !tagInput) {
			handleTags((tags) => tags.slice(0, -1));
		}
	};

	const chips = tags.map((tag) => (
		<Chip
			key={tag}
			size="sm"
			onClose={() => handleTags((tags) => tags.filter((t) => t !== tag))}
		>
			{tag}
		</Chip>
	));

	return (
		<Input
			startContent={
				chips.length > 0 && (
					<span className="flex flex-nowrap gap-1">{chips}</span>
				)
			}
			onValueChange={handleKeywordChange}
			value={tagInput}
			onClear={() => handleTags(() => [])}
			onKeyDown={handleBackspace}
			{...props}
		/>
	);
}
