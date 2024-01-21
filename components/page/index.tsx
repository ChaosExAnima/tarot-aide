import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import Head from 'next/head';

import Nav from './nav';

import type { PropsWithChildren } from 'react';

interface BreadcrumbProps {
	label: string;
	href: string;
}

interface PageProps {
	title?: string;
	breadcrumbs?: (BreadcrumbProps | false)[];
}

export default function Page({
	title,
	children,
	breadcrumbs,
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
			{Array.isArray(breadcrumbs) && (
				<Breadcrumbs className="mt-2 mx-4">
					<BreadcrumbItem href="/">Home</BreadcrumbItem>
					{breadcrumbs
						.filter((b): b is BreadcrumbProps => !!b)
						.map(({ label, href }) => (
							<BreadcrumbItem key={href} href={href}>
								{label}
							</BreadcrumbItem>
						))}
				</Breadcrumbs>
			)}
			<main className="container flex flex-col grow gap-4 p-4">
				{children}
			</main>
		</>
	);
}
