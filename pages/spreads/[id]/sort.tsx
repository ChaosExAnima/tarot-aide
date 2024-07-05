import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
	faCancel,
	faGripVertical,
	faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Link } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { arrayMoveImmutable } from 'array-move';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { CollapsibleButton } from 'components/buttons/collapsible';
import Page from 'components/page';
import Photo from 'components/photo';
import { loadedEntities } from 'lib/api';
import { displayCardFullName } from 'lib/cards/utils';
import { mutateUpdateSpread, positionsToBody } from 'lib/spreads/api';
import { getSpreadById } from 'lib/spreads/db';
import { displaySpreadName } from 'lib/spreads/utils';
import { LoadedEntity } from 'lib/types';
import { redirectToLogin, userFromServerContext } from 'lib/users';

import type { SpreadPosition } from 'lib/spreads/types';
import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';

export default function SpreadSortPage({
	spread,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter();
	const [sortIds, setSortIds] = useState(
		loadedEntities(spread.positions, true),
	);
	const positions = useMemo(
		() =>
			sortIds.map((id) =>
				spread.positions.find((p) => p.id === id),
			) as LoadedEntity<SpreadPosition>[],
		[spread.positions, sortIds],
	);
	const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: () =>
			mutateUpdateSpread(spread.id, {
				positions: positionsToBody(positions),
			}),
		onSuccess: () => router.push(`/spreads/${spread.id}`),
	});
	const disabled = isPending || isSuccess;
	const handleSortEnd = (event: DragEndEvent) => {
		if (disabled) {
			return;
		}
		const { over, active } = event;
		if (over?.id && active.id !== over.id) {
			setSortIds((oldIds) => {
				const oldIndex = oldIds.indexOf(Number(active.id));
				const newIndex = oldIds.indexOf(Number(over.id));

				return arrayMoveImmutable(oldIds, oldIndex, newIndex);
			});
		}
	};
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
	);
	return (
		<Page
			breadcrumbs={[
				{ label: 'Spreads', href: '/spreads' },
				{
					label: displaySpreadName(spread),
					href: `/spreads/${spread.id}`,
				},
				{ label: 'Sort', href: `/spreads/${spread.id}/sort` },
			]}
		>
			<header className="flex flex-col">
				<div className="flex flex-nowrap gap-4 items-center mb-4">
					<h1 className="grow font-bold text-2xl">
						{displaySpreadName(spread)}
					</h1>
					<ButtonGroup>
						<CollapsibleButton
							onPress={() => mutate()}
							isLoading={disabled}
							color="success"
							startContent={<FontAwesomeIcon icon={faSave} />}
						>
							Save
						</CollapsibleButton>
						<CollapsibleButton
							as={Link}
							isDisabled={disabled}
							href={`/spreads/${spread.id}`}
							color="danger"
							startContent={<FontAwesomeIcon icon={faCancel} />}
						>
							Cancel
						</CollapsibleButton>
					</ButtonGroup>
				</div>
			</header>
			{spread.photo && <Photo photo={spread.photo} />}
			<ol className="flex flex-col gap-4">
				<DndContext
					sensors={sensors}
					onDragEnd={handleSortEnd}
					collisionDetection={closestCenter}
					id={spread.id.toString()}
					modifiers={[restrictToVerticalAxis]}
				>
					<SortableContext items={sortIds}>
						{positions.map((p) => (
							<PositionCard key={p.id} position={p} />
						))}
					</SortableContext>
				</DndContext>
			</ol>
		</Page>
	);
}

type SpreadPageContext = {
	id: string;
};

export async function getServerSideProps(
	context: GetServerSidePropsContext<SpreadPageContext>,
) {
	const id = Number(context.params?.id);
	if (!id || isNaN(id)) {
		return { notFound: true };
	}
	const user = await userFromServerContext(context);
	if (!user) {
		return redirectToLogin();
	}
	const spread = await getSpreadById(id, user.id);
	if (!spread) {
		return { notFound: true };
	}

	return {
		props: {
			spread,
		},
	};
}

function PositionCard({
	position: { id, card, name, reversed },
}: {
	position: LoadedEntity<SpreadPosition>;
}) {
	const { attributes, listeners, transform, transition, setNodeRef } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			style={style}
			className={clsx(
				'w-full min-h-16 flex flex-nowrap gap-3 items-center cursor-grab select-none',
				'bg-content1 text-foreground shadow-medium rounded-large transition-transform-background p-3',
			)}
		>
			<FontAwesomeIcon icon={faGripVertical} />
			<div className="flex-grow">
				{card && displayCardFullName(card)}
				{name && card ? (
					<span className="text-content4 ml-2">{name}</span>
				) : (
					name
				)}
			</div>
			{reversed && <span className="text-content4">Reversed</span>}
		</li>
	);
}
