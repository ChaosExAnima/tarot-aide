import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useState } from 'react';

import PlainCard, { CardProps } from './card';

interface LinkedCardProps extends CardProps {}

const AnimatedLink = animated(Link);

export default function LinkedCard({ ...props }: LinkedCardProps) {
	// See https://codesandbox.io/s/pf74x?file=/src/App.tsx
	const [hovering, setHovering] = useState(false);
	const style = useSpring({
		scale: hovering ? 2 : 1,
	});
	const handleMouse = () => {
		console.log('mouse!');
		setHovering(!hovering);
	};
	return (
		<AnimatedLink
			href={props.card.name}
			style={{ transform: 'perspective(600px)', ...style }}
			onMouseEnter={handleMouse}
			onMouseLeave={handleMouse}
		>
			<PlainCard {...props} />
		</AnimatedLink>
	);
}
