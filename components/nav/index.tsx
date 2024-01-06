import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
	{ label: 'Cards', path: '/', exact: true },
	{ label: 'Spreads', path: '/spreads' },
];

export default function Nav() {
	const router = useRouter();
	return (
		<Navbar isBordered>
			<NavbarContent>
				{NavList.map((item) => (
					<NavbarItem
						key={item.path}
						isActive={
							item.exact
								? router.pathname === item.path
								: router.pathname.startsWith(item.path)
						}
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
					endContent={<FontAwesomeIcon icon={faSearch} />}
				/>
			</NavbarContent>
		</Navbar>
	);
}
