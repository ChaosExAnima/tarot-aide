import { Button, ButtonProps } from '@nextui-org/react';

export function CollapsibleButton({
	children,
	className,
	...props
}: ButtonProps) {
	return (
		<Button
			{...props}
			className={`px-0 sm:px-unit-4 min-w-0 ${className ?? ''}`}
		>
			{children && <span className="hidden sm:block">{children}</span>}
		</Button>
	);
}
