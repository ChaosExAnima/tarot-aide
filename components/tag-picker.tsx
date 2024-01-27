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

	const handleKeywordChange = (text: string) => {
		const newTags = text
			.replaceAll(/(and|or)+/g, '')
			.split(',')
			.map((t) => t.trim())
			.filter((t) => !!t); // Remove empty strings.

		if (newTags.length > 1) {
			handleTags((tags) => Array.from(new Set(tags.concat(newTags))));
			setTagInput('');
		} else {
			setTagInput(text);
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
