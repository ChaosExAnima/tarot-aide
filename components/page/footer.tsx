import { Link } from '@nextui-org/react';

const devLinks = [
	{
		label: 'Font Awesome',
		href: 'https://fontawesome.com/search?q=&o=r&m=free',
	},
	{ label: 'NextUI', href: 'https://nextui.org/' },
	{ label: 'Next.js', href: 'https://nextjs.org/' },
	{ label: 'TailwindCSS', href: 'https://tailwindcss.com/' },
	{ label: 'TypeScript', href: 'https://www.typescriptlang.org/' },
];

export default function PageFooter() {
	return (
		<footer className="mt-2 w-full bg-content1">
			<div className="container mx-auto p-4 text-center">
				{process.env.NODE_ENV === 'development' && (
					<ul className="flex gap-4 justify-between">
						{devLinks.map(({ label, href }) => (
							<li key={href}>
								<Link
									className="text-content3"
									href={href}
									isExternal
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</footer>
	);
}
