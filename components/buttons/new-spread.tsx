import { Button, ButtonProps } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { mutateCreateSpread } from 'lib/spreads/api';

interface NewSpreadButtonProps {
	className?: string;
	color?: ButtonProps['color'];
}

export default function NewSpreadButton({
	className = '',
	color = 'primary',
}: NewSpreadButtonProps) {
	const router = useRouter();
	const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: mutateCreateSpread,
		onSuccess: ({ spreadId }) => {
			router.push(`/spreads/${spreadId}/edit`);
		},
	});

	return (
		<Button
			onPress={() => mutate()}
			isLoading={isPending || isSuccess}
			color={color}
			className={`font-bold ${className}`}
		>
			New Spread
		</Button>
	);
}
