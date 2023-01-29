import Head from 'next/head';

import Nav from 'components/nav';

import type { PropsWithChildren } from 'react';

interface PageProps {
	title?: string;
}

export default function Page({
	title,
	children,
}: PropsWithChildren<PageProps>) {
	let pageTitle = 'Tarot Aide';
	if (title) {
		pageTitle = `${title} - ${pageTitle}`;
	}
	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<meta
					name="description"
					content="Tarot Aide - A helpful customizable reference for tarot readings"
					key="description"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
					key="viewport"
				/>
				<link rel="icon" href="/favicon.ico" key="icon" />
			</Head>
			<Nav />
			{children}
		</>
	);
}
