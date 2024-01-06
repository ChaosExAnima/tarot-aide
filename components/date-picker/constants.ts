import { displayOrdinal } from 'lib/text';

interface SelectItemValue {
	value: string;
	label: string;
}

const EARLIEST_YEAR = 2000;

export function getMaxDaysInMonth(month: number, year: number): number {
	return new Date(year, month + 1, 0).getDate();
}

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
		Array(getMaxDaysInMonth(date.getMonth(), date.getFullYear())).keys(),
	).map((day) => ({
		value: String(day + 1),
		label: displayOrdinal(day + 1),
	}));
}
