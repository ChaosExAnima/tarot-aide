import { useMemo, useState } from 'react';

import { getDays } from './constants';

export function useDate(initial = new Date()) {
	const [date, setDate] = useState(initial);
	const days = useMemo(() => getDays(date), [date]);
	const setDay = (day: number) =>
		setDate((date) => {
			const newDate = new Date(date);
			newDate.setDate(day);
			return newDate;
		});
	const setMonth = (month: number) =>
		setDate((date) => {
			const newDate = new Date(date);
			newDate.setMonth(month + 1);
			return newDate;
		});
	const setYear = (year: number) =>
		setDate((date) => {
			const newDate = new Date(date);
			newDate.setFullYear(year);
			return newDate;
		});
	return {
		date,
		days,
		setDay,
		setMonth,
		setYear,
	};
}
