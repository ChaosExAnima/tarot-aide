import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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

/**
 * Display a relative date, e.g. "today", "yesterday", "2 days ago", "3 months ago", "1 year ago"
 *
 * @param date - The date to display.
 * @returns A string representing the relative date.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
 */
export function displayRelativeDate(date: Date): string {
	return dayjs(date).fromNow();
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

const pluralRules = new Intl.PluralRules('en');

/**
 * Pluralizes a noun based on the given number.
 *
 * @param number - The number to determine the plural form.
 * @param noun - The noun to be pluralized.
 * @returns The pluralized noun.
 */
export function pluralize(number: number, noun = ''): string {
	switch (pluralRules.select(number)) {
		case 'one':
			return noun;
		default:
			return noun + 's';
	}
}

export function slugify(input: string): string {
	return encodeURIComponent(input.replaceAll(/\s+/g, '-').toLowerCase());
}

export function isUrl(input?: string): boolean {
	if (!input) {
		return false;
	}
	try {
		new URL(input);
		return true;
	} catch {
		return false;
	}
}

export function displayDomain(url: string): string {
	try {
		return new URL(url).hostname;
	} catch {
		return url;
	}
}
