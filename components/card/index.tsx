import type { PropsWithChildren } from 'react';

export interface CardProps {
	title: string;
}

export default function Card({ title }: PropsWithChildren<CardProps>) {
	return <div>{title}</div>;
}
