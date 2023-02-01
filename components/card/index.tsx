import Link from 'next/link';

import PlainCard, { CardProps } from './card';

export default function Card({
	link = true,
	...props
}: CardProps & { link?: boolean }) {
	if (link) {
		return (
			<Link href={`/cards/${props.card.name}`}>
				<PlainCard {...props} />
			</Link>
		);
	}
	return <PlainCard {...props} />;
}
