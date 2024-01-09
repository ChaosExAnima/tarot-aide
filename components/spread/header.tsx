import {
	faCalendar,
	faCancel,
	faEdit,
	faSave,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Button, Input, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { ZodIssue } from 'zod';

import ConfirmationModal from 'components/confirmation-modal';
import DatePicker from 'components/date-picker';
import { ApiError } from 'lib/api';
import { mutateDeleteSpread, mutateUpdateSpread } from 'lib/spreads/api';
import { displaySpreadName } from 'lib/spreads/utils';
import { displayDate } from 'lib/text';

import type { ExistingSpread } from 'lib/spreads/types';

interface SpreadHeaderProps {
	spread: ExistingSpread;
}

export default function SpreadHeader(props: SpreadHeaderProps) {
	const { spread } = props;
	const [editing, setEditing] = useState(false);
	const deleteSpread = useMutation({
		mutationFn: () => mutateDeleteSpread(spread.id),
		onSuccess: () => router.push('/spreads'),
	});
	if (editing) {
		return <SpreadHeaderEdit {...props} close={() => setEditing(false)} />;
	}

	return (
		<header className="flex flex-col">
			<div className="flex flex-nowrap gap-4 items-center mb-4">
				<h1 className="grow font-bold text-2xl">
					{displaySpreadName(spread)}
				</h1>
				<ButtonGroup isDisabled={deleteSpread.isPending}>
					<Button
						onPress={() => setEditing(true)}
						color="primary"
						isIconOnly
					>
						<FontAwesomeIcon icon={faEdit} />
					</Button>
					<ConfirmationModal
						isIconOnly
						onConfirm={deleteSpread.mutate}
						header="Delete this spread?"
						body="This is permanent!"
					>
						<FontAwesomeIcon icon={faTrash} />
					</ConfirmationModal>
				</ButtonGroup>
			</div>
			{spread.notes
				?.split('\n')
				.filter(Boolean)
				.map((line) => (
					<p key={line} className="text-content4 text-sm">
						{line.trim()}
					</p>
				))}
		</header>
	);
}

type ErrorMap = Partial<Record<keyof ExistingSpread, string[]>>;

function SpreadHeaderEdit({
	spread: initial,
	close,
}: SpreadHeaderProps & { close: () => void }) {
	const router = useRouter();
	const [spread, setSpread] = useState(initial);
	const [dirty, setDirty] = useState(false);
	const [errors, setErrors] = useState<ErrorMap>({});
	const changeFactory =
		<Key extends keyof ExistingSpread>(key: Key) =>
		(value: ExistingSpread[Key]) =>
			setSpread((spread) => {
				setDirty(true);
				setErrors((errors) => ({ ...errors, [key]: [] }));
				return { ...spread, [key]: value };
			});
	const updateSpread = useMutation({
		mutationFn: () =>
			mutateUpdateSpread(initial.id, {
				...spread,
				positions: spread.positions.map((pos) => ({
					...pos,
					card: pos.card?.name,
					notes: pos.notes ?? null,
				})),
			}),
		onSuccess: () => {
			router.replace(router.asPath);
			close();
		},
		onError: (error) => {
			if (
				error instanceof ApiError &&
				Array.isArray(error.response?.details)
			) {
				const issues: ZodIssue[] = error.response.details;
				const newErrors: ErrorMap = {};
				for (const issue of issues) {
					for (const path of issue.path) {
						(newErrors[path as keyof ExistingSpread] ??= []).push(
							issue.message,
						);
					}
				}
				setErrors(newErrors);
			}
		},
	});
	return (
		<header>
			<Input
				value={spread.name}
				onValueChange={changeFactory('name')}
				placeholder="Spread name"
				isRequired
				classNames={{
					inputWrapper: 'h-8',
				}}
				isInvalid={!!errors.name?.length}
				errorMessage={errors.name?.join(', ')}
			/>
			<Textarea
				value={spread.notes ?? ''}
				onValueChange={changeFactory('notes')}
				placeholder="Notes"
				fullWidth
				className="my-4"
				isInvalid={!!errors.notes?.length}
				errorMessage={errors.notes?.join(', ')}
			/>
			<div className="flex flex-nowrap gap-4 items-center">
				<DatePicker
					onPick={changeFactory('date')}
					isIconOnly={false}
					isDisabled={updateSpread.isPending}
					color={!!errors.date?.length ? 'danger' : 'default'}
				>
					<FontAwesomeIcon icon={faCalendar} />
					{displayDate(spread.date)}
				</DatePicker>
				<ButtonGroup
					isDisabled={updateSpread.isPending}
					className="grow justify-end"
				>
					<Button
						onPress={() => updateSpread.mutate()}
						isLoading={updateSpread.isPending}
						color="success"
						isDisabled={!dirty}
						isIconOnly
					>
						<FontAwesomeIcon icon={faSave} />
					</Button>
					<Button onPress={close} color="danger" isIconOnly>
						<FontAwesomeIcon icon={faCancel} />
					</Button>
				</ButtonGroup>
			</div>
			{errors.date && (
				<p className="text-red-500">{errors.date.join(', ')}</p>
			)}
		</header>
	);
}
