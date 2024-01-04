import { Button, ButtonProps, Link } from '@nextui-org/react';

export default function ButtonLink({ className, ...props }: ButtonProps) {
	return (
		<Button
			as={Link}
			color="primary"
			{...props}
			className={`${className} flex font-bold text-lg text-center h-full min-h-10`}
		/>
	);
}
