import type { PropsWithChildren } from 'react';

export interface CardProps {
	color: 'blue' | 'red';
}

export default function Card({ color }: PropsWithChildren<CardProps>) {
	return (
		<div className={color} style={{ color }}>
			{color.toUpperCase()}!
		</div>
	);
}
