import { Chip, Input, InputProps } from '@nextui-org/react';
import { useState, KeyboardEvent, useEffect } from 'react';

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

	useEffect(() => {
		onChange(tags);
	}, [onChange, tags]);

	const handleKeywordChange = (text: string) => {
		const newTags = text.split(',');

		if (newTags.length > 1) {
			const filteredTags = newTags
				.map((t) => t.trim())
				.filter((t) => !!t);
			if (filteredTags.length > 0) {
				setTags((tags) =>
					Array.from(new Set(tags.concat(filteredTags))),
				);
			}
			setTagInput('');
		} else {
			setTagInput(text);
		}
	};
	const handleBackspace = (event: KeyboardEvent) => {
		if (event.key === 'Backspace' && !tagInput) {
			setTags((tags) => tags.slice(0, -1));
		}
	};

	const chips = tags.map((tag) => (
		<Chip
			key={tag}
			size="sm"
			onClose={() => setTags((tags) => tags.filter((t) => t !== tag))}
		>
			{tag}
		</Chip>
	));

	return (
		<Input
			startContent={
				chips.length > 0 && (
					<span className="flex flex-wrap gap-1">{chips}</span>
				)
			}
			classNames={{
				inputWrapper: 'h-auto pt-6',
				innerWrapper: '!items-start',
				label: 'top-4',
			}}
			onValueChange={handleKeywordChange}
			value={tagInput}
			onClear={() => setTags(() => [])}
			onKeyDown={handleBackspace}
			{...props}
		/>
	);
}
