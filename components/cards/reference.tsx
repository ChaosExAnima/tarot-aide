import { CardReference } from 'lib/cards/types';

interface CardReferenceDisplayProps {
	cardRef: CardReference;
}

export default function CardReferenceDisplay({
	cardRef,
}: CardReferenceDisplayProps) {
	const lines = cardRef.text.split('\n');
	return (
		<div className="flex flex-col gap-2">
			<h2 className="text-xl text-center">
				{cardRef.keywords.join(', ')}
			</h2>
			<blockquote>
				{lines.map((line) => (
					<p key={line}>{line}</p>
				))}
				{cardRef.source && (
					<cite className="text-right italic">
						- {cardRef.source}
					</cite>
				)}
			</blockquote>
		</div>
	);
}
