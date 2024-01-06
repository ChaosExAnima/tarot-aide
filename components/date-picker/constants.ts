import { displayOrdinal } from 'lib/text';

interface SelectItemValue {
	value: string;
	label: string;
}

const EARLIEST_YEAR = 2000;

// Years from 2000 to current year
export function getYears(): SelectItemValue[] {
	return Array.from(
		Array(new Date().getFullYear() - EARLIEST_YEAR + 1).keys(),
	)
		.map((year) => ({
			value: String(EARLIEST_YEAR + year),
			label: String(EARLIEST_YEAR + year),
		}))
		.toReversed(); // Most recent to earliest
}

export function getMonths(): SelectItemValue[] {
	const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
	return Array.from(Array(12).keys()).map((month) => ({
		value: String(month),
		label: formatter.format(new Date(EARLIEST_YEAR, month, 1)),
	}));
}

export function getDays(date: Date): SelectItemValue[] {
	return Array.from(
		Array(
			new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
		).keys(),
	).map((day) => ({ value: String(day), label: displayOrdinal(day + 1) }));
}
