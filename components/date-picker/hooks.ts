import { useState } from 'react';

import { getDays, getMaxDaysInMonth } from './constants';

export function useDatePicker(initial = new Date()) {
	const [date, setDate] = useState(initial);

	const days = getDays(date);

	const setDay = (day: number) =>
		setDate((date) => {
			const newDate = new Date(date);
			newDate.setDate(day);
			return newDate;
		});
	const setMonth = (month: number) =>
		setDate((date) => {
			const newDate = new Date(date);
			newDate.setMonth(month);
			const maxDays = getMaxDaysInMonth(newDate);
			if (newDate.getDate() > maxDays) {
				newDate.setDate(maxDays);
			}
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
