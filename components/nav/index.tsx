import {
	Input,
	Link,
	Navbar,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react';
import { useRouter } from 'next/router';

interface NavItem {
	label: string;
	path: string;
	exact?: boolean;
}

export const NavList: NavItem[] = [
	{ label: 'Home', path: '/', exact: true },
	{ label: 'Spreads', path: '/spreads' },
	{ label: 'Cards', path: '/cards' },
];

export default function Nav() {
	const router = useRouter();
	return (
		<Navbar>
			<NavbarContent>
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
			<NavbarContent as="div" justify="end">
				<Input
					classNames={{
						base: 'max-w-full sm:max-w-[10rem] h-10',
						mainWrapper: 'h-full',
						input: 'text-small',
						inputWrapper:
							'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
					}}
					placeholder="Search"
					size="sm"
					type="search"
				/>
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
