import { animated, useSpring, config as springConfig } from '@react-spring/web';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { displayCase } from 'lib/text';

import classes from './card.module.css';

import type { GenericCard } from 'lib/types';

export interface CardProps {
	card: GenericCard;
	width?: number;
	height?: number;
	visible?: boolean;
	follow?: boolean;
}

const CONSTRAINT = 100;

export default function PlainCard({
	card,
	width = 300,
	height = 550,
	visible = true,
	follow = false,
}: CardProps) {
	const [{ xys, opacity }, api] = useSpring(() => ({
		xys: [0, 0, 1],
		opacity: visible ? 1 : 0,
		config: (key) =>
			key === 'xys' ? springConfig.slow : springConfig.stiff,
	}));

	// Follow the mouse
	// Maybe break out via https://github.com/pmndrs/react-spring/tree/master/demo/src/sandboxes/macos-dock/src
	const move = useCallback(
		({ clientX, clientY }: MouseEvent) =>
			visible && api.set({ xys: mouseLook(clientX, clientY) }),
		[api, visible]
	);
	useEffect(() => {
		if (!follow) {
			window.removeEventListener('mousemove', move);
			return;
		}
		window.addEventListener('mousemove', move);
		return () => window.removeEventListener('mousemove', move);
	}, [follow, move]);

	const [prevVisible, setPrevVisible] = useState(visible);
	if (prevVisible !== visible) {
		setPrevVisible(visible);

		api.start({
			opacity: visible ? 1 : 0,
			xys: [visible ? 0 : 20, 0, visible ? 1 : 0.5],
		});
	}

	return (
		<animated.figure
			style={{
				transform: xys.to(transform),
				opacity,
			}}
			className={classes.card}
		>
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
		</animated.figure>
	);
}

function transform(x: number, y: number, s: number) {
	return `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
}
function mouseLook(mouseX: number, mouseY: number, zoom = 1) {
	return [
		-(mouseY - window.innerHeight / 2) / CONSTRAINT,
		(mouseX - window.innerWidth / 2) / CONSTRAINT,
		zoom,
	];
}
