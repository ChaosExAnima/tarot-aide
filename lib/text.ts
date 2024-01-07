/**
 * Converts the first character of each word in a string to uppercase.
 *
 * @param input - The input string to be converted.
 * @returns The converted string with the first character of each word in uppercase.
 */
export function displayCase(input: string): string {
	return input.replace(
		/([a-z])(\w{2,})/g,
		(_, firstChar: string, rest: string) => firstChar.toUpperCase() + rest,
	);
}

/**
 * Converts a date object to a formatted string representation.
 *
 * @param date - The date object to be formatted.
 * @returns The formatted string representation of the date.
 */
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

/**
 * Display a relative date, e.g. "today", "yesterday", "2 days ago", "3 months ago", "1 year ago"
 *
 * @param date - The date to display.
 * @returns A string representing the relative date.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
 */
export function displayRelativeDate(date: Date): string {
	const diff = date.getTime() - Date.now();
	const days = Math.ceil(diff / (1000 * 60 * 60 * 24)) * -1;

	if (days === 0) {
		return 'today';
	} else if (days === 1) {
		return 'yesterday';
	} else if (days <= 30) {
		return rtf.format(days, 'day');
	} else if (days < 365) {
		const months = Math.floor(days / 30);
		return rtf.format(months, 'month');
	} else if (days >= 365) {
		const years = Math.floor(days / 365);
		return rtf.format(years, 'year');
	}
	return rtf.format(days, 'day');
}

const ordinalFormatter = new Intl.PluralRules('en', { type: 'ordinal' });

/**
 * Converts a number to its ordinal representation.
 *
 * @param value - The number to be converted.
 * @returns The ordinal representation of the number.
 */
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
