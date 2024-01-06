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
			const maxDays = getMaxDaysInMonth(month, date.getFullYear());
			const newDate = new Date(date);
			if (newDate.getDate() > maxDays) {
				newDate.setDate(maxDays);
			}
			newDate.setMonth(month);

			return newDate;
		});
	const setYear = (year: number) =>
		setDate((date) => {
			const maxDays = getMaxDaysInMonth(date.getMonth(), year);
			const newDate = new Date(date);
			if (newDate.getDate() > maxDays) {
				newDate.setDate(maxDays);
			}
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
