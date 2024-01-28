import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Accordion,
	AccordionItem,
	Button,
	CircularProgress,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

import ButtonLink from 'components/button-link';
import MaybeLink from 'components/maybe-link';
import { useCardReferences } from 'components/references/hooks';
import { mutateUpdateCardReference } from 'lib/cards/api';
import { cardUrl } from 'lib/cards/utils';
import { displayDomain } from 'lib/text';

import type { CardReference, GenericCard } from 'lib/cards/types';

interface CardReferenceProps {
	card: GenericCard;
	reversed: boolean;
}

export default function ReferencesList({
	card: { name },
	reversed,
}: CardReferenceProps) {
	const { data, isLoading, key } = useCardReferences(name, reversed);
	const queryClient = useQueryClient();
	const { mutate, isPending: isStarring } = useMutation({
		mutationFn: (ref: CardReference) =>
			mutateUpdateCardReference({ starred: !ref.starred }, ref.id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: key });
		},
	});
	if (isLoading || !data) {
		return (
			<div className="mt-4 mx-auto">
				<CircularProgress label="Loading references…" />
			</div>
		);
	}
	return (
		<Accordion
			as="section"
			defaultExpandedKeys={[data.defaultReference.toString()]}
			variant="splitted"
			className="gap-4"
			itemClasses={{
				content: 'flex flex-col gap-2 pb-4',
			}}
		>
			{data.references.map((ref) => {
				const title = ref.keywords.join(', ');
				const lines = ref.text.trim().split('\n').filter(Boolean);
				return (
					<AccordionItem
						title={title}
						subtitle={
							<MaybeLink href={ref.source}>
								{displayDomain(ref.source ?? '')}
							</MaybeLink>
						}
						aria-label={title}
						key={ref.id}
					>
						<blockquote className="flex flex-col gap-2">
							{lines.map((line) => (
								<p key={line}>{line}</p>
							))}
						</blockquote>
						{ref.id > 0 && (
							<div className="flex gap-2 justify-end">
								<ButtonLink
									href={`${cardUrl(name, false, true)}/${
										ref.id
									}`}
									startContent={
										<FontAwesomeIcon icon={faEdit} />
									}
									className="ml-auto bg-primary-500"
								>
									Edit
								</ButtonLink>
								<Button
									startContent={
										<FontAwesomeIcon icon={faStar} />
									}
									onPress={() => mutate(ref)}
									isDisabled={isStarring}
									className={clsx(
										ref.starred
											? 'bg-secondary-800 text-secondary'
											: 'bg-secondary text-secondary-800',
									)}
								>
									{ref.starred ? 'Unstar' : 'Star'}
								</Button>
							</div>
						)}
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
