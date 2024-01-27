import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MaybeLink from 'components/maybe-link';
import { mutateUpdateCardReference } from 'lib/cards/api';
import { cardUrl } from 'lib/cards/utils';
import { displayDomain } from 'lib/text';

import type { CardReference, GenericCard } from 'lib/cards/types';
import type { LoadedRecursively } from 'lib/types';

interface CardReferenceProps {
	card: LoadedRecursively<GenericCard>;
	defaultId?: number;
}

export function CardReferences({
	card: { name, references },
	defaultId = 0,
}: CardReferenceProps) {
	const router = useRouter();
	const { mutate, isPending } = useMutation({
		mutationFn: (ref: CardReference) =>
			mutateUpdateCardReference({ starred: !ref.starred }, ref.id),
		onSuccess: () => {
			router.replace(router.asPath);
		},
	});
	if (!references || !references.length) {
		return null;
	}
	return (
		<Accordion
			as="section"
			defaultExpandedKeys={[defaultId.toString()]}
			variant="splitted"
			className="gap-4"
			itemClasses={{
				content: 'flex flex-col gap-2 pb-4',
			}}
		>
			{references.map((ref) => {
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
								<Button
									as={Link}
									href={`${cardUrl(name, false, true)}/${
										ref.id
									}`}
									startContent={
										<FontAwesomeIcon icon={faEdit} />
									}
									className="ml-auto bg-primary-500"
								>
									Edit
								</Button>
								<Button
									startContent={
										<FontAwesomeIcon icon={faStar} />
									}
									onPress={() => mutate(ref)}
									isLoading={isPending}
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
