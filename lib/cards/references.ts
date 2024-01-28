import { AnyCard } from './constants';
import { CardReference } from './types';

type CardReferenceSimple = Pick<CardReference, 'keywords' | 'text'>;
type CardReferenceDualMeanings = {
	upright: CardReferenceSimple;
	reversed: CardReferenceSimple;
};

export function getDefaultCardReference(
	cardName: AnyCard,
	reversed = false,
): CardReference {
	return {
		...references[cardName][reversed ? 'reversed' : 'upright'],
		card: cardName,
		reversed,
		id: 0,
		starred: false,
	};
}

// Generated with ChatGPT, will swap out for if CC license is found
export const references = {
	fool: {
		upright: {
			keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
			text: 'The Fool is the first card of the Major Arcana. It represents the beginning of a journey, the start of a new chapter in your life. The Fool is a card of innocence, spontaneity, and free spirit. It is a card of new beginnings, of adventure, and of opportunity. The Fool is a card of optimism and hope, of faith in the future and a belief that the Universe will always provide.',
		},
		reversed: {
			keywords: ['recklessness', 'risk-taking', 'naivety', 'foolishness'],
			text: 'The Fool reversed represents recklessness, risk-taking, naivety, and foolishness. It is a card of poor judgement, of making bad decisions, and of taking unnecessary risks. The Fool reversed is a card of recklessness, of taking unnecessary risks, and of making bad decisions. It is a card of naivety, of foolishness, and of poor judgement.',
		},
	},
	magician: {
		upright: {
			keywords: ['willpower', 'desire', 'creation', 'manifestation'],
			text: 'The Magician is the second card of the Major Arcana. It represents willpower, desire, creation, and manifestation. The Magician is a card of willpower, of desire, of creation, and of manifestation. It is a card of the conscious mind, of the will, and of the desire to create.',
		},
		reversed: {
			keywords: ['trickery', 'deception', 'manipulation', 'out of touch'],
			text: 'The Magician reversed represents trickery, deception, manipulation, and being out of touch with reality. It is a card of trickery, of deception, of manipulation, and of being out of touch with reality. The Magician reversed is a card of trickery, of deception, of manipulation, and of being out of touch with reality.',
		},
	},
	'high priestess': {
		upright: {
			keywords: [
				'intuition',
				'unconscious',
				'inner voice',
				'spirituality',
			],
			text: 'The High Priestess is the third card of the Major Arcana. It represents intuition, the unconscious, the inner voice, and spirituality. The High Priestess is a card of intuition, of the unconscious, of the inner voice, and of spirituality. It is a card of intuition, of the unconscious, of the inner voice, and of spirituality.',
		},
		reversed: {
			keywords: ['secrets', 'mystery', 'paranoia', 'hidden agendas'],
			text: 'The High Priestess reversed represents secrets, mystery, paranoia, and hidden agendas. It is a card of secrets, of mystery, of paranoia, and of hidden agendas. The High Priestess reversed is a card of secrets, of mystery, of paranoia, and of hidden agendas.',
		},
	},
	empress: {
		upright: {
			keywords: ['fertility', 'nurturing', 'abundance', 'motherhood'],
			text: 'The Empress is the fourth card of the Major Arcana. It represents fertility, nurturing, abundance, and motherhood. The Empress is a card of fertility, of nurturing, of abundance, and of motherhood. It is a card of fertility, of nurturing, of abundance, and of motherhood.',
		},
		reversed: {
			keywords: ['dependence', 'smothering', 'neglect', 'creative block'],
			text: 'The Empress reversed represents dependence, smothering, neglect, and creative block. It is a card of dependence, of smothering, of neglect, and of creative block. The Empress reversed is a card of dependence, of smothering, of neglect, and of creative block.',
		},
	},
	emperor: {
		upright: {
			keywords: ['authority', 'structure', 'control', 'fatherhood'],
			text: 'The Emperor is the fifth card of the Major Arcana. It represents authority, structure, control, and fatherhood. The Emperor is a card of authority, of structure, of control, and of fatherhood. It is a card of authority, of structure, of control, and of fatherhood.',
		},
		reversed: {
			keywords: ['tyranny', 'rigidity', 'coldness', 'domination'],
			text: 'The Emperor reversed represents tyranny, rigidity, coldness, and domination. It is a card of tyranny, of rigidity, of coldness, and of domination. The Emperor reversed is a card of tyranny, of rigidity, of coldness, and of domination.',
		},
	},
	hierophant: {
		upright: {
			keywords: ['tradition', 'conformity', 'morality', 'ethics'],
			text: 'The Hierophant is the sixth card of the Major Arcana. It represents tradition, conformity, morality, and ethics. The Hierophant is a card of tradition, of conformity, of morality, and of ethics. It is a card of tradition, of conformity, of morality, and of ethics.',
		},
		reversed: {
			keywords: [
				'rebellion',
				'subversiveness',
				'non-conformity',
				'unorthodoxy',
			],
			text: 'The Hierophant reversed represents rebellion, subversiveness, non-conformity, and unorthodoxy. It is a card of rebellion, of subversiveness, of non-conformity, and of unorthodoxy. The Hierophant reversed is a card of rebellion, of subversiveness, of non-conformity, and of unorthodoxy.',
		},
	},
	lovers: {
		upright: {
			keywords: ['partnerships', 'relationships', 'choices', 'values'],
			text: 'The Lovers is the seventh card of the Major Arcana. It represents partnerships, relationships, choices, and values. The Lovers is a card of partnerships, of relationships, of choices, and of values. It is a card of partnerships, of relationships, of choices, and of values.',
		},
		reversed: {
			keywords: ['disharmony', 'imbalance', 'misalignment', 'distrust'],
			text: 'The Lovers reversed represents disharmony, imbalance, misalignment, and distrust. It is a card of disharmony, of imbalance, of misalignment, and of distrust. The Lovers reversed is a card of disharmony, of imbalance, of misalignment, and of distrust.',
		},
	},
	chariot: {
		upright: {
			keywords: ['willpower', 'control', 'victory', 'assertion'],
			text: 'The Chariot is the eighth card of the Major Arcana. It represents willpower, control, victory, and assertion. The Chariot is a card of willpower, of control, of victory, and of assertion. It is a card of willpower, of control, of victory, and of assertion.',
		},
		reversed: {
			keywords: [
				'aggression',
				'dominance',
				'disruption',
				'lack of control',
			],
			text: 'The Chariot reversed represents aggression, dominance, disruption, and lack of control. It is a card of aggression, of dominance, of disruption, and of lack of control. The Chariot reversed is a card of aggression, of dominance, of disruption, and of lack of control.',
		},
	},
	strength: {
		upright: {
			keywords: ['courage', 'compassion', 'self-control', 'patience'],
			text: 'Strength is the ninth card of the Major Arcana. It represents courage, compassion, self-control, and patience. Strength is a card of courage, of compassion, of self-control, and of patience. It is a card of courage, of compassion, of self-control, and of patience.',
		},
		reversed: {
			keywords: [
				'weakness',
				'insecurity',
				'self-doubt',
				'lack of confidence',
			],
			text: 'Strength reversed represents weakness, insecurity, self-doubt, and lack of confidence. It is a card of weakness, of insecurity, of self-doubt, and of lack of confidence. Strength reversed is a card of weakness, of insecurity, of self-doubt, and of lack of confidence.',
		},
	},
	hermit: {
		upright: {
			keywords: ['introspection', 'solitude', 'guidance', 'seeking'],
			text: 'The Hermit is the tenth card of the Major Arcana. It represents introspection, solitude, guidance, and seeking. The Hermit is a card of introspection, of solitude, of guidance, and of seeking. It is a card of introspection, of solitude, of guidance, and of seeking.',
		},
		reversed: {
			keywords: ['isolation', 'loneliness', 'withdrawal', 'rejection'],
			text: 'The Hermit reversed represents isolation, loneliness, withdrawal, and rejection. It is a card of isolation, of loneliness, of withdrawal, and of rejection. The Hermit reversed is a card of isolation, of loneliness, of withdrawal, and of rejection.',
		},
	},
	'wheel of fortune': {
		upright: {
			keywords: ['change', 'cycles', 'ups and downs', 'fate'],
			text: 'The Wheel of Fortune is the eleventh card of the Major Arcana. It represents change, cycles, ups and downs, and fate. The Wheel of Fortune is a card of change, of cycles, of ups and downs, and of fate. It is a card of change, of cycles, of ups and downs, and of fate.',
		},
		reversed: {
			keywords: [
				'bad luck',
				'misfortune',
				'unpredictability',
				'external influences',
			],
			text: 'The Wheel of Fortune reversed represents bad luck, misfortune, unpredictability, and external influences. It is a card of bad luck, of misfortune, of unpredictability, and of external influences. The Wheel of Fortune reversed is a card of bad luck, of misfortune, of unpredictability, and of external influences.',
		},
	},
	justice: {
		upright: {
			text: 'The Justice card represents fairness, balance, and truth. In the upright position, it signifies a fair and just resolution to a situation. Embrace the principles of equality, act with integrity, and make decisions based on objective reasoning.',
			keywords: ['fairness', 'balance', 'truth'],
		},
		reversed: {
			text: 'When reversed, the Justice card may indicate injustice or a lack of accountability. It suggests the need to address imbalances and strive for fairness in your actions. Examine your decisions and be mindful of the consequences to promote a more just environment.',
			keywords: [
				'injustice',
				'lack of accountability',
				'striving for fairness',
			],
		},
	},
	'hanged man': {
		upright: {
			text: 'The Hanged Man signifies surrender, letting go, and gaining a new perspective. In this position, it suggests willingly embracing a period of suspension or sacrifice to gain valuable insights. It encourages a different outlook on challenges and emphasizes the importance of patience and non-resistance.',
			keywords: ['surrender', 'new perspective', 'patience'],
		},
		reversed: {
			text: "When reversed, the Hanged Man may indicate resistance to necessary sacrifices or a refusal to see things from a different perspective. It might suggest a reluctance to let go of control or a fear of change. It's essential to reflect on areas where resistance may be hindering personal growth and embrace the opportunities for a fresh viewpoint.",
			keywords: ['resistance', 'fear of change', 'reluctance'],
		},
	},
	death: {
		upright: {
			text: 'The Death card represents transformation, change, and new beginnings. It signifies the end of one phase and the start of another. This card does not necessarily indicate physical death but rather a symbolic death of old patterns, habits, or situations. Embrace the change and let go of what no longer serves you.',
			keywords: ['transformation', 'change', 'new beginnings'],
		},
		reversed: {
			text: "When reversed, the Death card may indicate resistance to change or a fear of letting go. It could suggest clinging to old ways or situations that are hindering personal growth. It's essential to identify and address the areas where you're resisting necessary transformations and embrace the opportunities for positive change.",
			keywords: ['resistance', 'fear', 'letting go'],
		},
	},
	temperance: {
		upright: {
			text: 'The Temperance card represents balance, moderation, and harmony. It signifies a period of patience and self-control. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['balance', 'moderation', 'harmony'],
		},
		reversed: {
			text: "When reversed, the Temperance card may indicate a lack of balance or moderation. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of balance', 'stagnation', 'resistance'],
		},
	},
	devil: {
		upright: {
			text: 'The Devil card represents bondage, materialism, and temptation. In the upright position, it suggests being aware of unhealthy attachments or habits that may be holding you back. Take control of your impulses, and break free from self-imposed limitations.',
			keywords: ['bondage', 'materialism', 'temptation'],
		},
		reversed: {
			text: 'When reversed, the Devil card indicates liberation from restrictions and breaking free from negative influences. It signals overcoming addictions or unhealthy patterns. Embrace the newfound freedom and take steps towards a healthier and more fulfilling life.',
			keywords: ['liberation', 'breaking free', 'overcoming'],
		},
	},
	tower: {
		upright: {
			text: 'The Tower represents sudden upheaval, destruction, and chaos. It signifies a significant change or disruption that may be unexpected or unwanted. In the upright position, it suggests embracing the change and letting go of what no longer serves you.',
			keywords: ['sudden upheaval', 'destruction', 'chaos'],
		},
		reversed: {
			text: "When reversed, the Tower card may indicate resisting necessary change or clinging to old ways. It could suggest a fear of letting go or a reluctance to embrace the unknown. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['resistance', 'fear', 'letting go'],
		},
	},
	star: {
		upright: {
			text: 'The Star represents hope, faith, and inspiration. It signifies a period of healing and renewal. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['hope', 'faith', 'inspiration'],
		},
		reversed: {
			text: "When reversed, the Star card may indicate a lack of faith or hope for the future. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of faith', 'stagnation', 'resistance'],
		},
	},
	moon: {
		upright: {
			text: 'The Moon represents illusion, fear, and anxiety. It signifies a period of uncertainty and confusion. In the upright position, it suggests embracing the unknown and trusting your intuition.',
			keywords: ['illusion', 'fear', 'anxiety'],
		},
		reversed: {
			text: "When reversed, the Moon card may indicate a lack of clarity or confusion. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of clarity', 'confusion', 'resistance'],
		},
	},
	sun: {
		upright: {
			text: 'The Sun represents joy, happiness, and success. It signifies a period of positivity and optimism. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with hope.',
			keywords: ['joy', 'happiness', 'success'],
		},
		reversed: {
			text: "When reversed, the Sun card may indicate a lack of positivity or optimism. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of positivity', 'stagnation', 'resistance'],
		},
	},
	judgement: {
		upright: {
			text: 'The Judgement card represents rebirth, renewal, and awakening. It signifies a period of reflection and self-evaluation. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['rebirth', 'renewal', 'awakening'],
		},
		reversed: {
			text: "When reversed, the Judgement card may indicate a lack of reflection or self-evaluation. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of reflection', 'stagnation', 'resistance'],
		},
	},
	world: {
		upright: {
			text: 'The World represents completion, fulfillment, and achievement. It signifies a period of success and accomplishment. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['completion', 'fulfillment', 'achievement'],
		},
		reversed: {
			text: "When reversed, the World card may indicate a lack of completion or fulfillment. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of completion', 'stagnation', 'resistance'],
		},
	},
	'ace of cups': {
		upright: {
			text: 'The Ace of Cups represents new beginnings, intuition, and creativity. It signifies a period of emotional fulfillment and joy. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['new beginnings', 'intuition', 'creativity'],
		},
		reversed: {
			text: "When reversed, the Ace of Cups may indicate a lack of emotional fulfillment or joy. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of fulfillment', 'stagnation', 'resistance'],
		},
	},
	'two of cups': {
		upright: {
			text: 'The Two of Cups represents love, partnership, and connection. It signifies a period of harmony and balance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['love', 'partnership', 'connection'],
		},
		reversed: {
			text: "When reversed, the Two of Cups may indicate a lack of harmony or balance. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of harmony', 'stagnation', 'resistance'],
		},
	},
	'three of cups': {
		upright: {
			text: 'The Three of Cups represents friendship, celebration, and community. It signifies a period of joy and abundance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['friendship', 'celebration', 'community'],
		},
		reversed: {
			text: "When reversed, the Three of Cups may indicate a lack of joy or abundance. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of joy', 'stagnation', 'resistance'],
		},
	},
	'four of cups': {
		upright: {
			text: 'The Four of Cups represents contemplation, apathy, and boredom. It signifies a period of stagnation and boredom. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['contemplation', 'apathy', 'boredom'],
		},
		reversed: {
			text: "When reversed, the Four of Cups may indicate a lack of contemplation or apathy. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of contemplation', 'stagnation', 'resistance'],
		},
	},
	'five of cups': {
		upright: {
			text: 'The Five of Cups represents loss, regret, and disappointment. It signifies a period of sadness and grief. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['loss', 'regret', 'disappointment'],
		},
		reversed: {
			text: "When reversed, the Five of Cups may indicate a lack of loss or regret. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of loss', 'stagnation', 'resistance'],
		},
	},
	'six of cups': {
		upright: {
			text: 'The Six of Cups represents nostalgia, childhood, and innocence. It signifies a period of happiness and joy. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['nostalgia', 'childhood', 'innocence'],
		},
		reversed: {
			text: "When reversed, the Six of Cups may indicate a lack of nostalgia or innocence. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of nostalgia', 'stagnation', 'resistance'],
		},
	},
	'seven of cups': {
		upright: {
			text: 'The Seven of Cups represents illusion, fantasy, and wishful thinking. It signifies a period of confusion and uncertainty. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['illusion', 'fantasy', 'wishful thinking'],
		},
		reversed: {
			text: "When reversed, the Seven of Cups may indicate a lack of illusion or fantasy. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth.",
			keywords: ['lack of illusion', 'stagnation', 'resistance'],
		},
	},
	'eight of cups': {
		upright: {
			text: 'The Eight of Cups represents abandonment, withdrawal, and disappointment. It signifies a period of sadness and grief. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['abandonment', 'withdrawal', 'disappointment'],
		},
		reversed: {
			text: "When reversed, the Eight of Cups may indicate a lack of abandonment or withdrawal. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth. ",
			keywords: ['lack of abandonment', 'stagnation', 'resistance'],
		},
	},
	'nine of cups': {
		upright: {
			text: 'The Nine of Cups represents contentment, satisfaction, and gratitude. It signifies a period of happiness and joy. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['contentment', 'satisfaction', 'gratitude'],
		},
		reversed: {
			text: "When reversed, the Nine of Cups may indicate a lack of contentment or satisfaction. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth. ",
			keywords: ['lack of contentment', 'stagnation', 'resistance'],
		},
	},
	'ten of cups': {
		upright: {
			text: 'The Ten of Cups represents harmony, peace, and family. It signifies a period of joy and abundance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['harmony', 'peace', 'family'],
		},
		reversed: {
			text: "When reversed, the Ten of Cups may indicate a lack of harmony or peace. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth. ",
			keywords: ['lack of harmony', 'stagnation', 'resistance'],
		},
	},
	'page of cups': {
		upright: {
			text: 'The Page of Cups represents creativity, intuition, and sensitivity. It signifies a period of emotional fulfillment and joy. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['creativity', 'intuition', 'sensitivity'],
		},
		reversed: {
			text: "When reversed, the Page of Cups may indicate a lack of emotional fulfillment or joy. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth. ",
			keywords: ['lack of fulfillment', 'stagnation', 'resistance'],
		},
	},
	'knight of cups': {
		upright: {
			text: 'The Knight of Cups represents romance, charm, and creativity. It signifies a period of harmony and balance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['romance', 'charm', 'creativity'],
		},
		reversed: {
			text: "When reversed, the Knight of Cups may indicate a lack of romance or charm. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth. ",
			keywords: ['lack of romance', 'stagnation', 'resistance'],
		},
	},
	'queen of cups': {
		upright: {
			text: 'The Queen of Cups represents compassion, empathy, and intuition. It signifies a period of happiness and joy. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['compassion', 'empathy', 'intuition'],
		},
		reversed: {
			text: "When reversed, the Queen of Cups may indicate a lack of compassion or empathy. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth. ",
			keywords: ['lack of compassion', 'stagnation', 'resistance'],
		},
	},
	'king of cups': {
		upright: {
			text: 'The King of Cups represents emotional maturity, compassion, and wisdom. It signifies a period of harmony and balance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['emotional maturity', 'compassion', 'wisdom'],
		},
		reversed: {
			text: "When reversed, the King of Cups may indicate a lack of emotional maturity or compassion. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations and embrace the opportunities for growth. ",
			keywords: [
				'lack of emotional maturity',
				'stagnation',
				'resistance',
			],
		},
	},
	'ace of pentacles': {
		upright: {
			text: 'The Ace of Pentacles represents new beginnings, opportunity, and prosperity. It signifies a period of financial stability and abundance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['new beginnings', 'opportunity', 'prosperity'],
		},
		reversed: {
			text: "When reversed, the Ace of Pentacles may indicate a lack of financial stability or abundance. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth. ",
			keywords: [
				'lack of financial stability',
				'stagnation',
				'resistance',
			],
		},
	},
	'two of pentacles': {
		upright: {
			text: 'The Two of Pentacles represents balance, flexibility, and adaptability. It signifies a period of harmony and balance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['balance', 'flexibility', 'adaptability'],
		},
		reversed: {
			text: "When reversed, the Two of Pentacles may indicate a lack of balance or flexibility. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth. ",
			keywords: ['lack of balance', 'stagnation', 'resistance'],
		},
	},
	'three of pentacles': {
		upright: {
			text: 'The Three of Pentacles represents teamwork, collaboration, and planning. It signifies a period of success and accomplishment. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['teamwork', 'collaboration', 'planning'],
		},
		reversed: {
			text: "When reversed, the Three of Pentacles may indicate a lack of teamwork or collaboration. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth. ",
			keywords: ['lack of teamwork', 'stagnation', 'resistance'],
		},
	},
	'four of pentacles': {
		upright: {
			text: 'The Four of Pentacles represents stability, security, and control. It signifies a period of financial stability and abundance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['stability', 'security', 'control'],
		},
		reversed: {
			text: "When reversed, the Four of Pentacles may indicate a lack of stability or security. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth. ",
			keywords: ['lack of stability', 'stagnation', 'resistance'],
		},
	},
	'five of pentacles': {
		upright: {
			text: 'The Five of Pentacles represents poverty, hardship, and loss. It signifies a period of sadness and grief. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['poverty', 'hardship', 'loss'],
		},
		reversed: {
			text: "When reversed, the Five of Pentacles may indicate a lack of poverty or hardship. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth. ",
			keywords: ['lack of poverty', 'stagnation', 'resistance'],
		},
	},
	'six of pentacles': {
		upright: {
			text: 'The Six of Pentacles represents generosity, charity, and giving. It signifies a period of happiness and joy. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['generosity', 'charity', 'giving'],
		},
		reversed: {
			text: "When reversed, the Six of Pentacles may indicate a lack of generosity or charity. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth. ",
			keywords: ['lack of generosity', 'stagnation', 'resistance'],
		},
	},
	'seven of pentacles': {
		upright: {
			text: 'The Seven of Pentacles represents perseverance, diligence, and hard work. It signifies a period of success and accomplishment. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['perseverance', 'diligence', 'hard work'],
		},
		reversed: {
			text: "When reversed, the Seven of Pentacles may indicate a lack of perseverance or diligence. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth. ",
			keywords: ['lack of perseverance', 'stagnation', 'resistance'],
		},
	},
	'eight of pentacles': {
		upright: {
			text: 'The Eight of Pentacles represents apprenticeship, education, and skill development. It signifies a period of financial stability and abundance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['apprenticeship', 'education', 'skill development'],
		},
		reversed: {
			text: "When reversed, the Eight of Pentacles may indicate a lack of apprenticeship or education. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth.",
			keywords: ['lack of apprenticeship', 'stagnation', 'resistance'],
		},
	},
	'nine of pentacles': {
		upright: {
			text: 'The Nine of Pentacles represents luxury, self-sufficiency, and independence. It signifies a period of happiness and joy. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['luxury', 'self-sufficiency', 'independence'],
		},
		reversed: {
			text: "When reversed, the Nine of Pentacles may indicate a lack of luxury or self-sufficiency. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth.",
			keywords: ['lack of luxury', 'stagnation', 'resistance'],
		},
	},
	'ten of pentacles': {
		upright: {
			text: 'The Ten of Pentacles represents wealth, inheritance, and family. It signifies a period of joy and abundance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['wealth', 'inheritance', 'family'],
		},
		reversed: {
			text: "When reversed, the Ten of Pentacles may indicate a lack of wealth or inheritance. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth.",
			keywords: ['lack of wealth', 'stagnation', 'resistance'],
		},
	},
	'page of pentacles': {
		upright: {
			text: 'The Page of Pentacles represents ambition, diligence, and persistence. It signifies a period of financial stability and abundance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['ambition', 'diligence', 'persistence'],
		},
		reversed: {
			text: "When reversed, the Page of Pentacles may indicate a lack of ambition or diligence. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformations, and embrace the opportunities for growth.",
			keywords: ['lack of ambition', 'stagnation', 'resistance'],
		},
	},
	'knight of pentacles': {
		upright: {
			text: 'The Knight of Pentacles represents responsibility, reliability, and hard work. It signifies a period of harmony and balance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['responsibility', 'reliability', 'hard work'],
		},
		reversed: {
			text: "When reversed, the Knight of Pentacles may indicate a lack of responsibility or reliability. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation, and embrace the opportunities for growth.",
			keywords: ['lack of responsibility', 'stagnation', 'resistance'],
		},
	},
	'queen of pentacles': {
		upright: {
			text: 'The Queen of Pentacles represents practicality, generosity, and security. It signifies a period of happiness and joy. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['practicality', 'generosity', 'security'],
		},
		reversed: {
			text: "When reversed, the Queen of Pentacles may indicate a lack of practicality or generosity. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation, and embrace the opportunities for growth.",
			keywords: ['lack of practicality', 'stagnation', 'resistance'],
		},
	},
	'king of pentacles': {
		upright: {
			text: 'The King of Pentacles represents abundance, prosperity, and security. It signifies a period of harmony and balance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['abundance', 'prosperity', 'security'],
		},
		reversed: {
			text: "When reversed, the King of Pentacles may indicate a lack of abundance or prosperity. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation, and embrace the opportunities for growth.",
			keywords: ['lack of abundance', 'stagnation', 'resistance'],
		},
	},
	'ace of swords': {
		upright: {
			text: 'The Ace of Swords represents new beginnings, mental clarity, and success. It signifies a period of mental clarity and success. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['new beginnings', 'mental clarity', 'success'],
		},
		reversed: {
			text: "When reversed, the Ace of Swords may indicate a lack of mental clarity or success. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation, and embrace the opportunities for growth.",
			keywords: ['lack of mental clarity', 'stagnation', 'resistance'],
		},
	},
	'two of swords': {
		upright: {
			text: 'The Two of Swords represents indecision, stalemate, and avoidance. It signifies a period of confusion and uncertainty. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['indecision', 'stalemate', 'avoidance'],
		},
		reversed: {
			text: "When reversed, the Two of Swords may indicate a lack of indecision or stalemate. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation, and embrace the opportunities for growth.",
			keywords: ['lack of indecision', 'stagnation', 'resistance'],
		},
	},
	'three of swords': {
		upright: {
			text: 'The Three of Swords represents heartbreak, sorrow, and emotional pain. In the upright position, it signifies a period of deep emotional distress, often stemming from a painful truth or a betrayal. Allow yourself to grieve, seek support, and focus on emotional healing.',
			keywords: ['heartbreak', 'sorrow', 'emotional pain'],
		},
		reversed: {
			text: 'When reversed, the Three of Swords may indicate the beginning of emotional healing and recovery from a difficult situation. It suggests finding closure, forgiving, and letting go of past hurts. Take steps towards emotional renewal and rebuilding inner strength.',
			keywords: ['healing', 'closure', 'forgiveness'],
		},
	},
	'four of swords': {
		upright: {
			text: 'The Four of Swords represents rest, relaxation, and recuperation. It signifies a period of rest and recovery. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['rest', 'relaxation', 'recuperation'],
		},
		reversed: {
			text: "When reversed, the Four of Swords may indicate a lack of rest or relaxation. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation, and embrace the opportunities for growth.",
			keywords: ['lack of rest', 'stagnation', 'resistance'],
		},
	},
	'five of swords': {
		upright: {
			text: 'The Five of Swords represents conflict, tension, and loss. It signifies a period of sadness and grief. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['conflict', 'tension', 'loss'],
		},
		reversed: {
			text: "When reversed, the Five of Swords may indicate a lack of conflict or tension. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation, and embrace the opportunities for growth.",
			keywords: ['lack of conflict', 'stagnation', 'resistance'],
		},
	},
	'six of swords': {
		upright: {
			text: 'The Six of Swords represents transition, change, and moving on. It signifies a period of sadness and grief. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['transition', 'change', 'moving on'],
		},
		reversed: {
			text: "When reversed, the Six of Swords may indicate a lack of transition or change. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation, and embrace the opportunities for growth.",
			keywords: ['lack of transition', 'stagnation', 'resistance'],
		},
	},
	'seven of swords': {
		upright: {
			text: 'The Seven of Swords represents deception, betrayal, and trickery. It signifies a period of sadness and grief. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['deception', 'betrayal', 'trickery'],
		},
		reversed: {
			text: "When reversed, the Seven of Swords may indicate a lack of deception or betrayal. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation and embrace the opportunities for growth.",
			keywords: ['lack of deception', 'stagnation', 'resistance'],
		},
	},
	'eight of swords': {
		upright: {
			text: 'The Eight of Swords represents restriction, helplessness, and isolation. It signifies a period of sadness and grief. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['restriction', 'helplessness', 'isolation'],
		},
		reversed: {
			text: "When reversed, the Eight of Swords may indicate a lack of restriction or helplessness. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation and embrace the opportunities for growth.",
			keywords: ['lack of restriction', 'stagnation', 'resistance'],
		},
	},
	'nine of swords': {
		upright: {
			text: 'The Nine of Swords represents anxiety, worry, and fear. It signifies a period of stress and mental anguish. In the upright position, it suggests facing your fears and anxieties and looking towards the future with courage.',
			keywords: ['anxiety', 'worry', 'fear'],
		},
		reversed: {
			text: "When reversed, the Nine of Swords may indicate a release from anxiety or worry. It could suggest a period of recovery or overcoming fears. It's essential to identify and address the areas where you're resisting positive transformation and embrace the opportunities for growth.",
			keywords: ['release from anxiety', 'recovery', 'overcoming fears'],
		},
	},
	'ten of swords': {
		upright: {
			text: 'The Ten of Swords represents betrayal, loss, and crisis. It signifies a period of hardship and endings. In the upright position, it suggests accepting the end of a cycle and looking towards the future with resilience.',
			keywords: ['betrayal', 'loss', 'crisis'],
		},
		reversed: {
			text: "When reversed, the Ten of Swords may indicate a recovery from betrayal or loss. It could suggest a period of healing or the start of a new cycle. It's essential to identify and address the areas where you're resisting positive transformation and embrace the opportunities for growth.",
			keywords: ['recovery from betrayal', 'healing', 'new beginnings'],
		},
	},
	'page of swords': {
		upright: {
			text: 'The Page of Swords represents curiosity, restlessness, and mental agility. It signifies a period of mental clarity and success. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['curiosity', 'restlessness', 'mental agility'],
		},
		reversed: {
			text: "When reversed, the Page of Swords may indicate a lack of mental clarity or success. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation and embrace the opportunities for growth.",
			keywords: ['lack of mental clarity', 'stagnation', 'resistance'],
		},
	},
	'knight of swords': {
		upright: {
			text: 'The Knight of Swords represents action, impulsiveness, and haste. It signifies a period of harmony and balance. In the upright position, it suggests embracing the opportunities for growth and looking towards the future with optimism.',
			keywords: ['action', 'impulsiveness', 'haste'],
		},
		reversed: {
			text: "When reversed, the Knight of Swords may indicate a lack of action or impulsiveness. It could suggest a period of stagnation or feeling stuck in a rut. It's essential to identify and address the areas where you're resisting positive transformation and embrace the opportunities for growth.",
			keywords: ['lack of action', 'stagnation', 'resistance'],
		},
	},
	'queen of swords': {
		upright: {
			text: 'The Queen of Swords represents intelligence, clear communication, and independence. In the upright position, she embodies a sharp mind and the ability to make rational decisions. Embrace your intellect, express yourself with clarity, and approach challenges with a logical mindset.',
			keywords: ['intelligence', 'clear communication', 'independence'],
		},
		reversed: {
			text: 'When reversed, the Queen of Swords may indicate a tendency towards coldness or cutting remarks. It suggests the need to balance logic with empathy and consider the emotional impact of words. Work on fostering understanding and maintaining a compassionate communication style.',
			keywords: ['coldness', 'cutting remarks', 'empathy'],
		},
	},
	'king of swords': {
		upright: {
			text: 'The King of Swords represents authority, mental clarity, and fair decision-making. In the upright position, he embodies a strong and fair leader who values logic and truth. Embrace your ability to make wise decisions, communicate effectively, and lead with integrity.',
			keywords: ['authority', 'mental clarity', 'fair decision-making'],
		},
		reversed: {
			text: 'When reversed, the King of Swords may indicate abuse of power or a tendency towards authoritarian behavior. It suggests the need to temper authority with compassion and consider the impact of decisions on others. Strive for fairness and humility in leadership.',
			keywords: ['abuse of power', 'authoritarian behavior', 'fairness'],
		},
	},
	'ace of wands': {
		upright: {
			text: 'The Ace of Wands represents inspiration, new opportunities, and creative potential. In the upright position, it signifies the spark of a new idea or project. Embrace the creative energy and take bold steps to pursue your passions.',
			keywords: [
				'inspiration',
				'new opportunities',
				'creative potential',
			],
		},
		reversed: {
			text: 'When reversed, the Ace of Wands may indicate a lack of motivation or creative block. It suggests the need to overcome obstacles and reignite the passion for your pursuits. Take time to explore new sources of inspiration and break through barriers.',
			keywords: [
				'lack of motivation',
				'creative block',
				'overcoming obstacles',
			],
		},
	},
	'two of wands': {
		upright: {
			text: 'The Two of Wands represents planning, progress, and decisions. In the upright position, it signifies a period of planning and preparation. Embrace the opportunities for growth and take bold steps towards your goals.',
			keywords: ['planning', 'progress', 'decisions'],
		},
		reversed: {
			text: 'When reversed, the Two of Wands may indicate a lack of planning or progress. It suggests the need to overcome obstacles and take action towards your goals. Take time to explore new sources of inspiration and break through barriers.',
			keywords: [
				'lack of planning',
				'lack of progress',
				'overcoming obstacles',
			],
		},
	},
	'three of wands': {
		upright: {
			text: 'The Three of Wands represents foresight, expansion, and collaboration. In the upright position, it signifies the anticipation of success and the need to explore new horizons. Embrace opportunities for growth and consider partnerships that can lead to mutual benefits.',
			keywords: ['foresight', 'expansion', 'collaboration'],
		},
		reversed: {
			text: 'When reversed, the Three of Wands may indicate delays or missed opportunities. It suggests the need to be adaptable and open to different possibilities. Stay vigilant for new chances and be flexible in your approach to achieve your goals.',
			keywords: ['delays', 'missed opportunities', 'adaptability'],
		},
	},
	'four of wands': {
		upright: {
			text: 'The Four of Wands represents celebration, stability, and harmony. In the upright position, it signifies a time of joy and accomplishment. Embrace the positive energy, celebrate your achievements, and enjoy the stability in your personal and professional life.',
			keywords: ['celebration', 'stability', 'harmony'],
		},
		reversed: {
			text: 'When reversed, the Four of Wands may indicate disruptions in celebrations or instability. It suggests the need to address any challenges that may hinder your sense of harmony. Take steps to restore balance and create a solid foundation for future successes.',
			keywords: ['disruptions', 'instability', 'restoring balance'],
		},
	},
	'five of wands': {
		upright: {
			text: 'The Five of Wands represents competition, conflict, and challenges. In the upright position, it signifies a period of rivalry and discord. Embrace the opportunity to learn and grow from the challenges, and find constructive ways to resolve conflicts.',
			keywords: ['competition', 'conflict', 'challenges'],
		},
		reversed: {
			text: 'When reversed, the Five of Wands may indicate resolution and a reduction in conflicts. It suggests finding common ground and working together to overcome challenges. Embrace collaboration and seek peaceful resolutions to achieve your goals.',
			keywords: ['resolution', 'reduction in conflicts', 'collaboration'],
		},
	},
	'six of wands': {
		upright: {
			text: 'The Six of Wands represents victory, recognition, and public acclaim. In the upright position, it signifies achieving success and receiving acknowledgment for your efforts. Embrace the praise and use it as motivation to continue on your path of achievement.',
			keywords: ['victory', 'recognition', 'public acclaim'],
		},
		reversed: {
			text: 'When reversed, the Six of Wands may indicate challenges in gaining recognition or a fear of failure. It suggests the need to focus on personal growth and not be deterred by external validation. Trust in your abilities and continue working towards your goals.',
			keywords: [
				'challenges in recognition',
				'fear of failure',
				'personal growth',
			],
		},
	},
	'seven of wands': {
		upright: {
			text: 'The Seven of Wands represents courage, perseverance, and standing your ground. In the upright position, it signifies facing challenges with determination and resilience. Embrace your inner strength and defend your beliefs with confidence.',
			keywords: ['courage', 'perseverance', 'standing your ground'],
		},
		reversed: {
			text: 'When reversed, the Seven of Wands may indicate a fear of confrontation or a lack of confidence in defending your position. It suggests the need to overcome self-doubt and assert yourself with courage. Stand firm in your beliefs and face challenges head-on.',
			keywords: [
				'fear of confrontation',
				'lack of confidence',
				'assertiveness',
			],
		},
	},
	'eight of wands': {
		upright: {
			text: 'The Eight of Wands represents swiftness, progress, and forward momentum. In the upright position, it signifies a period of rapid development and the swift resolution of issues. Embrace the momentum, stay focused, and take advantage of the fast-paced energy.',
			keywords: ['swiftness', 'progress', 'forward momentum'],
		},
		reversed: {
			text: 'When reversed, the Eight of Wands may indicate delays or obstacles in progress. It suggests the need to address any barriers and reevaluate your plans. Stay adaptable and work towards removing hindrances to maintain forward momentum.',
			keywords: ['delays', 'obstacles', 'adaptability'],
		},
	},
	'nine of wands': {
		upright: {
			text: 'The Eight of Wands represents swiftness, progress, and forward momentum. In the upright position, it signifies a period of rapid development and the swift resolution of issues. Embrace the momentum, stay focused, and take advantage of the fast-paced energy.',
			keywords: ['swiftness', 'progress', 'forward momentum'],
		},
		reversed: {
			text: 'When reversed, the Eight of Wands may indicate delays or obstacles in progress. It suggests the need to address any barriers and reevaluate your plans. Stay adaptable and work towards removing hindrances to maintain forward momentum.',
			keywords: ['delays', 'obstacles', 'adaptability'],
		},
	},
	'ten of wands': {
		upright: {
			text: 'The Ten of Wands represents burden, responsibility, and overwhelm. In the upright position, it signifies carrying a heavy load and feeling the weight of responsibilities. Embrace the opportunity to reassess priorities, delegate tasks, and lighten your load.',
			keywords: ['burden', 'responsibility', 'overwhelm'],
		},
		reversed: {
			text: 'When reversed, the Ten of Wands may indicate a release of burdens or finding relief from overwhelming situations. It suggests the need to delegate responsibilities and focus on self-care. Take steps to lighten your load and create a more balanced approach to your commitments.',
			keywords: ['release of burdens', 'finding relief', 'self-care'],
		},
	},
	'page of wands': {
		upright: {
			text: 'The Page of Wands represents enthusiasm, exploration, and new beginnings. In the upright position, it signifies a youthful and adventurous spirit. Embrace the curiosity and passion for discovery, and be open to new opportunities that spark your interest.',
			keywords: ['enthusiasm', 'exploration', 'new beginnings'],
		},
		reversed: {
			text: 'When reversed, the Page of Wands may indicate impatience or a lack of direction. It suggests the need to channel your enthusiasm into focused endeavors and avoid scattered energy. Set clear goals and be patient in pursuing your passions.',
			keywords: ['impatience', 'lack of direction', 'focused endeavors'],
		},
	},
	'knight of wands': {
		upright: {
			text: 'The Knight of Wands represents action, passion, and impulsiveness. In the upright position, it signifies a bold and adventurous approach to challenges. Embrace your energy and pursue your goals with enthusiasm, but be mindful of impulsive decisions.',
			keywords: ['action', 'passion', 'impulsiveness'],
		},
		reversed: {
			text: 'When reversed, the Knight of Wands may indicate recklessness or a lack of planning. It suggests the need to consider the consequences of your actions and adopt a more measured approach. Channel your passion into focused and well-thought-out endeavors.',
			keywords: ['recklessness', 'lack of planning', 'measured approach'],
		},
	},
	'queen of wands': {
		upright: {
			text: 'The Queen of Wands represents confidence, independence, and charisma. In the upright position, she embodies a magnetic and influential presence. Embrace your leadership qualities, express your creativity, and inspire others with your dynamic energy.',
			keywords: ['confidence', 'independence', 'charisma'],
		},
		reversed: {
			text: 'When reversed, the Queen of Wands may indicate arrogance or a misuse of power. It suggests the need to balance confidence with humility and consider the impact of your actions on others. Use your charisma to uplift and inspire, rather than dominate.',
			keywords: ['arrogance', 'misuse of power', 'balance'],
		},
	},
	'king of wands': {
		upright: {
			text: 'The King of Wands represents leadership, vision, and influence. In the upright position, he embodies a charismatic and dynamic leader. Embrace your ability to inspire and lead with confidence, but be mindful of considering the input of others.',
			keywords: ['leadership', 'vision', 'influence'],
		},
		reversed: {
			text: 'When reversed, the King of Wands may indicate a misuse of power or a lack of direction. It suggests the need to reassess goals and leadership style. Strive for balance, listen to others, and ensure your influence is used for the greater good.',
			keywords: ['misuse of power', 'lack of direction', 'balance'],
		},
	},
} satisfies Record<AnyCard, CardReferenceDualMeanings>;
