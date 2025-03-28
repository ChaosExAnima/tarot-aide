import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

import { PageProps } from './index';

export interface BreadcrumbProps {
	label: string;
	href: string;
	disabled?: boolean;
}

export default function PageBreadcrumbs({
	breadcrumbs,
}: Pick<PageProps, 'breadcrumbs'>) {
	if (!breadcrumbs) {
		return null;
	}
	return (
		<Breadcrumbs className="mt-2 mx-auto px-4 container">
			<BreadcrumbItem href="/">Home</BreadcrumbItem>
			{breadcrumbs
				.filter((b): b is BreadcrumbProps => !!b)
				.map(({ label, href, disabled = false }) => (
					<BreadcrumbItem
						key={href}
						href={href}
						isDisabled={disabled}
					>
						{label}
					</BreadcrumbItem>
				))}
		</Breadcrumbs>
	);
}
