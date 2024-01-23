import { Accordion, AccordionItem } from '@nextui-org/react';

import type { CardReference, GenericCard } from 'lib/cards/types';
import type { LoadedRecursively } from 'lib/types';

interface CardReferenceProps {
	card: LoadedRecursively<GenericCard>;
}

export function CardReferences({ card: { references } }: CardReferenceProps) {
	if (!references || !references.length) {
		return null;
	}
	return (
		<Accordion as="section" defaultExpandedKeys={[references[0].id]}>
			{references.map((ref) => {
				const title = ref.keywords.join(', ');
				const lines = ref.text.trim().split('\n').filter(Boolean);
				return (
					<AccordionItem
						title={title}
						aria-label={title}
						key={ref.id}
					>
						<blockquote>
							{lines.map((line) => (
								<p key={line}>{line}</p>
							))}
							{ref.source && (
								<cite className="text-right italic">
									- {ref.source}
								</cite>
							)}
						</blockquote>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}

interface CardReferenceDisplayProps {
	cardRef: CardReference;
}

export function CardReferenceDisplay({ cardRef }: CardReferenceDisplayProps) {
	const lines = cardRef.text.trim().split('\n').filter(Boolean);
	return (
		<blockquote>
			{lines.map((line) => (
				<p key={line}>{line}</p>
			))}
			{cardRef.source && (
				<cite className="text-right italic">- {cardRef.source}</cite>
			)}
		</blockquote>
	);
}
