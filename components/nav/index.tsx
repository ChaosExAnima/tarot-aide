import { Link, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface NavItem {
	label: string;
	path: string;
	exact?: boolean;
}

export const NavList: NavItem[] = [
	{ label: 'Home', path: '/', exact: true },
	{ label: 'Tasks', path: '/tasks' },
	{ label: 'Spreads', path: '/spreads' },
	{ label: 'Cards', path: '/cards' },
	{ label: 'Decks', path: '/decks' },
];

export default function Nav() {
	const router = useRouter();
	return (
		<Navbar>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{NavList.map((item) => (
					<NavbarItem
						key={item.path}
						isActive={item.path === router.pathname}
					>
						<Link href={item.path} color="primary">
							{item.label}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
		</Navbar>
	);
}

type NavItemProps = NavItem & { curPath: string };
function NavItem({ label, path, exact, curPath }: NavItemProps) {
	if ((exact && curPath === path) || (!exact && curPath.startsWith(path))) {
		return <li aria-current>{label}</li>;
	}
	return (
		<li>
			<Link href={path}>{label}</Link>
		</li>
	);
}
