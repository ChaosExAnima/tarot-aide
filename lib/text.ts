export function displayCase(input: string): string {
	return input.replace(/(\w)(\w*)/g, (_, firstChar: string, rest: string) => {
		if (rest.length < 2) {
			return firstChar + rest;
		}
		return firstChar.toUpperCase() + rest;
	});
}

export function displayDate(date: Date): string {
	return date.toLocaleDateString('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

const rtf = new Intl.RelativeTimeFormat('en', {
	localeMatcher: 'best fit',
	numeric: 'always', // other values: "auto"
	style: 'short',
});

export function displayRelativeDate(date: Date): string {
	const diff = date.getTime() - Date.now();
	const days = diff / (1000 * 60 * 60 * 24);
	if (days < 0 && days > -1) {
		return 'earlier today';
	}
	if (days > -1 && days < -2) {
		return 'yesterday';
	}
	return rtf.format(days, 'day');
}

const ordinalFormatter = new Intl.PluralRules('en', { type: 'ordinal' });

export function displayOrdinal(value: number): string {
	switch (ordinalFormatter.select(value)) {
		case 'one':
			return `${value}st`;
		case 'two':
			return `${value}nd`;
		case 'few':
			return `${value}rd`;
		default:
			return `${value}th`;
	}
}
