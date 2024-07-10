import {
	faCalendar,
	faSave,
	faCancel,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Input,
	Textarea,
	ButtonGroup,
	Select,
	SelectItem,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

import { CollapsibleButton } from 'components/buttons/collapsible';
import ConfirmationModal from 'components/confirmation-modal';
import DatePicker from 'components/date-picker';
import Page from 'components/page';
import Photo from 'components/photo';
import EditSpreadList from 'components/spread/edit-list';
import { useEditSpread } from 'components/spread/hooks';
import UploadControls from 'components/upload';
import {
	mutateDeleteSpreadMedia,
	mutateUploadSpreadMedia,
} from 'lib/spreads/api';
import { decksForUser, getSpreadById } from 'lib/spreads/db';
import { displaySpreadName } from 'lib/spreads/utils';
import { displayDate } from 'lib/text';
import { redirectToLogin, userFromServerContext } from 'lib/users';

import type { SpreadPageContext, SpreadPageProps } from './index';
import type { MediaType } from 'lib/media';
import type { Deck } from 'lib/spreads/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface SpreadEditPageProps extends SpreadPageProps {
	decks: Deck[];
}

export default function SpreadEditPage({
	spread: initial,
	decks,
}: SpreadEditPageProps) {
	const { spread, set, issues, newIssue, dirty, disable, save } =
		useEditSpread(initial);
	const deleteMedia = useMutation({
		mutationFn: (type: MediaType) =>
			mutateDeleteSpreadMedia(spread.id, type),
		onSuccess: () => set('photo')(null),
	});
	const uploadMedia = useMutation({
		mutationFn: ({ type, media }: { type: MediaType; media: Blob }) =>
			mutateUploadSpreadMedia(spread.id, type, media),
		onSuccess: ({ media }) => set(media.type)(media),
		onError: (_error, { type }) =>
			newIssue(type, 'There was an error uploading your photo.', true),
	});
	return (
		<Page
			breadcrumbs={[
				{ label: 'Spreads', href: '/spreads' },
				{
					label: displaySpreadName(spread),
					href: `/spreads/${initial.id}`,
					disabled: !spread.name,
				},
				{ label: 'Edit', href: `/spreads/${initial.id}/edit` },
			]}
		>
			<header>
				<Input
					value={spread.name}
					onValueChange={set('name')}
					placeholder="Spread name"
					isRequired
					classNames={{
						inputWrapper: 'h-8',
					}}
					isInvalid={!!issues('name')}
					errorMessage={issues('name')}
				/>
				<Textarea
					value={spread.notes ?? ''}
					onValueChange={set('notes')}
					placeholder="Notes"
					fullWidth
					className="my-4"
					isInvalid={!!issues('notes')}
					errorMessage={issues('notes')}
				/>
				<div className="flex flex-nowrap gap-4 items-center">
					<DatePicker
						onPick={set('date')}
						isIconOnly={false}
						isDisabled={disable}
						color={!!issues('date') ? 'danger' : 'default'}
						className="min-w-32"
					>
						<FontAwesomeIcon icon={faCalendar} />
						{displayDate(spread.date)}
					</DatePicker>
					<Select
						className="max-h-10 w-auto min-w-40"
						label="Deck"
						size="sm"
						selectedKeys={[spread.deck?.id ?? '']}
						classNames={{
							trigger: 'max-h-10 min-h-10',
						}}
						onSelectionChange={(keys) => {
							if (keys === 'all') {
								return set('deck')(null);
							}
							const selectedKey = Array.from(keys.values()).at(0);
							const deck = decks.find(
								(deck) => selectedKey === deck.id,
							);
							set('deck')(deck ?? null);
						}}
						items={decks}
					>
						{decks.map((deck) => (
							<SelectItem key={deck.id}>{deck.name}</SelectItem>
						))}
					</Select>
					<ButtonGroup
						isDisabled={disable}
						className="grow justify-end"
					>
						<CollapsibleButton
							onPress={save}
							color="success"
							isDisabled={!dirty || disable}
							startContent={<FontAwesomeIcon icon={faSave} />}
						>
							Save
						</CollapsibleButton>
						<CollapsibleButton
							as={Link}
							href={`/spreads/${spread.id}`}
							color="danger"
							startContent={<FontAwesomeIcon icon={faCancel} />}
						>
							Cancel
						</CollapsibleButton>
					</ButtonGroup>
				</div>
				{issues('date') && (
					<p className="text-red-500">{issues('date')}</p>
				)}
			</header>
			{spread.photo && (
				<figure className="relative">
					<Photo photo={spread.photo} />
					<ConfirmationModal
						onConfirm={() => deleteMedia.mutate('photo')}
						isLoading={deleteMedia.isPending}
						isDisabled={deleteMedia.isPending}
						className="absolute top-2 right-2 z-20 rounded-full"
						isIconOnly
						color="danger"
						aria-label="Delete this image"
						header="Delete this image?"
					>
						<FontAwesomeIcon icon={faXmark} />
					</ConfirmationModal>
				</figure>
			)}
			{!spread.photo && (
				<UploadControls
					onSelect={(media) =>
						media && uploadMedia.mutate({ media, type: 'photo' })
					}
					isDisabled={uploadMedia.isPending}
					errorMessage={issues('photo')}
				/>
			)}

			<EditSpreadList spread={spread} onUpdate={set('positions')} />
		</Page>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext<SpreadPageContext>,
): Promise<GetServerSidePropsResult<SpreadEditPageProps>> {
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
			decks: await decksForUser(user.id),
		},
	};
}
