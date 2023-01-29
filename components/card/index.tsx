import Image from 'next/image';
import Link from 'next/link';

import { displayCase } from 'lib/text';

import classes from './card.module.css';

import type { GenericCard } from 'lib/types';

export interface CardProps {
	card: GenericCard;
	link?: boolean;
}

export function PlainCard({ card }: CardProps) {
	return (
		<figure className={classes.card}>
			{card.image && (
				<Image
					src={card.image}
					alt={`Art of ${card.name}`}
					width={300}
					height={550}
					className={classes.image}
				/>
			)}
			<figcaption className={classes.caption}>
				<span className={classes.name}>{displayCase(card.name)}</span>
			</figcaption>
		</figure>
	);
}

export default function Card({ link = true, ...props }: CardProps) {
	if (link) {
		return (
			<Link href={`/cards/${props.card.name}`}>
				<PlainCard {...props} />
			</Link>
		);
	}
	return <PlainCard {...props} />;
}
