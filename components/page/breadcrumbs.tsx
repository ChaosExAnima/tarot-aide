import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

import { PageProps } from './index';

export interface BreadcrumbProps {
	label: string;
	href: string;
}

export default function PageBreadcrumbs({
	breadcrumbs,
}: Pick<PageProps, 'breadcrumbs'>) {
	if (!breadcrumbs) {
		return null;
	}
	return (
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
	);
}
