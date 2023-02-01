import Image from 'next/image';

import { displayCase } from 'lib/text';

import classes from './card.module.css';

import type { GenericCard } from 'lib/types';

export interface CardProps {
	card: GenericCard;
	width?: number;
	height?: number;
}

export default function PlainCard({
	card,
	width = 300,
	height = 550,
}: CardProps) {
	return (
		<figure className={classes.card}>
			{card.image && (
				<Image
					src={card.image}
					alt={`Art of ${card.name}`}
					width={width}
					height={height}
					className={classes.image}
				/>
			)}
			<figcaption className={classes.caption}>
				<span className={classes.name}>{displayCase(card.name)}</span>
			</figcaption>
		</figure>
	);
}
