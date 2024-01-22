import { motion } from 'framer-motion';
import Head from 'next/head';

import PageBreadcrumbs, { BreadcrumbProps } from './breadcrumbs';
import Nav from './nav';

import type { PropsWithChildren } from 'react';

export interface PageProps {
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
			<PageBreadcrumbs breadcrumbs={breadcrumbs} />
			<motion.main
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{
					type: 'spring',
					stiffness: 260,
					damping: 20,
				}}
				className="container grow flex flex-col gap-4 p-4"
			>
				{children}
			</motion.main>
		</>
	);
}
