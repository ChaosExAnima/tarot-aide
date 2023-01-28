import styles from 'styles/tasks.module.css';

import Page from 'components/page';

import type { HTMLProps, PropsWithChildren } from 'react';

export default function Home() {
	return (
		<Page title="Tasks">
			<main className={styles.description}>
				<p>Stuff to do:</p>
				<ul>
					<ListItem checked disabled>
						Figure out base functionality
					</ListItem>
					<ListItem>Pick a damn front end library</ListItem>
					<ListItem>Lay out pages w/ mock data</ListItem>
					<ListItem>Figure out storage</ListItem>
					<ListItem>Upload stuff</ListItem>
					<ListItem>Wire &apos;er up</ListItem>
					<ListItem>Docker deployment</ListItem>
				</ul>
				<p>Ideas:</p>
				<ul>
					<li>Upload cards of deck</li>
					<li>Store text w/ references</li>
					<li>Landing page is fast jump to card</li>
					<li>Card has picture of chosen deck w/ available text</li>
					<li>Tagging system</li>
					<li>Make site super responsive, mobile first even</li>
					<li>Inspo: Numenera character app</li>
					<li>
						UI should feel <em>ethereal</em>
					</li>
					<li>Swap between decks</li>
					<li>Make UI change color throughout day?</li>
					<li>
						See about using filter animations, make images turn to
						mist or some shit
					</li>
					<li>
						<em>Detect corners?</em>
					</li>
				</ul>
			</main>
		</Page>
	);
}

function ListItem({
	children,
	...inputProps
}: PropsWithChildren<HTMLProps<HTMLInputElement>>) {
	const id = (children?.toString() ?? 'no-id')
		.toLowerCase()
		.replaceAll(/[^a-z0-9]+/g, '-');
	return (
		<li>
			<input
				type="checkbox"
				name={id}
				id={id}
				value="1"
				{...inputProps}
			/>
			&nbsp;
			<label htmlFor={id}>{children}</label>
		</li>
	);
}
