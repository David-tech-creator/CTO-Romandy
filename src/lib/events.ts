export type Event = {
  slug: string
  title: string
  titleFr: string
  date: string
  time: string
  location: string
  description: string
  descriptionFr: string
  agenda?: { time: string; item: string }[]
  maxSpots: number
  isUpcoming: boolean
  attendees?: number
  flyer?: string
}

export const EVENTS: Event[] = [
  {
    slug: 'innovation-luxury-april-2026',
    title: 'Agentic Commerce & the Luxury Industry',
    titleFr: 'Le Commerce Agentique & l\'Industrie du Luxe',
    date: 'April 30, 2026',
    time: '7:00 PM CET',
    location: 'Antaes, GBC – Avenue des Morgines 12, Petit-Lancy',
    description:
      'AI agents are beginning to reshape how consumers discover, evaluate, and buy luxury products. This evening brings together two perspectives — architecture and strategy — to explore what agentic commerce really means for technology leaders in the luxury sector: from omnichannel to agent-driven architectures, trust mechanisms, protocols, and the role of blockchain and digital product passports.',
    descriptionFr:
      'Les agents IA commencent à transformer la façon dont les consommateurs découvrent, évaluent et achètent des produits de luxe. Cette soirée réunit deux perspectives — architecture et stratégie — pour explorer ce que le commerce agentique signifie vraiment pour les leaders technologiques du secteur du luxe : des architectures omnicanales aux architectures pilotées par des agents, les mécanismes de confiance, les protocoles et le rôle de la blockchain et des passeports numériques de produits.',
    agenda: [
      { time: '19:00', item: 'Doors open & networking' },
      { time: '19:30', item: 'Introduction to Agentic Commerce — short presentation' },
      { time: '19:50', item: 'Panel discussion: architecture, strategy & the luxury paradox' },
      { time: '20:45', item: 'Open Q&A' },
      { time: '21:00', item: 'Drinks & networking' },
    ],
    maxSpots: 50,
    isUpcoming: true,
  },
  {
    slug: 'ai-dlc-february-2026',
    title: 'Building Apps Will Never Be the Same Again: Welcome to AI-DLC!',
    titleFr: 'La Création d\'Apps ne Sera Plus Jamais la Même : Bienvenue dans l\'AI-DLC !',
    date: 'Feb 12, 2026',
    time: '6:30 – 8:30 PM CET',
    location: 'Pictet, Route des Acacias 60, Carouge',
    description:
      'AI is no longer just accelerating how we write code — it\'s reshaping the entire software development lifecycle. As AI becomes a first-class participant in delivery, traditional role boundaries are dissolving: product managers are building working prototypes, developers are making architectural decisions alongside AI, and QA engineers are contributing earlier, influencing design instead of validating after the fact. Speaker Romain Jourdan, Chief Technologist at AWS, introduced AI-DLC: a new framework for software delivery built around three phases — Inception, Construction, and Operations. Drawing on Amazon\'s real-world implementation, the session covered the Plan–Execute pattern that preserves human oversight in AI-driven systems, and why traditional sprints give way to "bolts" when development cycles compress from weeks to hours.',
    descriptionFr:
      'L\'IA ne se contente plus d\'accélérer la façon dont nous écrivons du code — elle redéfinit l\'ensemble du cycle de développement logiciel. Alors que l\'IA devient un acteur de premier plan dans la livraison, les frontières traditionnelles des rôles s\'estompent. Romain Jourdan, Chief Technologist chez AWS, a présenté l\'AI-DLC : un nouveau cadre pour la livraison logicielle articulé autour de trois phases — Inception, Construction et Opérations. En s\'appuyant sur l\'implémentation réelle chez Amazon, la session a abordé le modèle Plan–Execute qui préserve la supervision humaine dans les systèmes pilotés par l\'IA, et pourquoi les sprints traditionnels cèdent la place à des "bolts" lorsque les cycles de développement se compriment de semaines en heures.',
    agenda: [
      { time: '18:30', item: 'Doors open & networking' },
      { time: '19:00', item: 'Welcome & introductions' },
      { time: '19:15', item: 'AI-DLC: A New Framework for Software Delivery — Romain Jourdan, AWS' },
      { time: '20:15', item: 'Q&A' },
      { time: '20:30', item: 'Drinks & networking' },
    ],
    maxSpots: 60,
    isUpcoming: false,
    attendees: 63,
    flyer: '/AI-DLC.avif',
  },
  {
    slug: 'quantum-ai-january-2026',
    title: 'Quantum-AI Convergence: A Strategic Framework for Technology Leaders',
    titleFr: 'Convergence Quantum-IA : Un Cadre Stratégique pour les Leaders Technologiques',
    date: 'Jan 29, 2026',
    time: '7:00 – 9:00 PM CET',
    location: 'Antaes, Avenue des Morgines 12, Lancy',
    description:
      'While AI dominates today\'s technology landscape, quantum technologies are rapidly maturing — and their convergence with AI will define the next computing paradigm. Devesh Jain, Lead Quantum Technology at the World Economic Forum, delivered a practical framework for understanding quantum computing, sensing, communications, and security. The session explored real-world industrial applications and provided an actionable playbook for navigating the quantum-AI convergence. No physics degree required.',
    descriptionFr:
      'Alors que l\'IA domine le paysage technologique actuel, les technologies quantiques arrivent rapidement à maturité — et leur convergence avec l\'IA définira le prochain paradigme informatique. Devesh Jain, Lead Quantum Technology au Forum Économique Mondial, a présenté un cadre pratique pour comprendre l\'informatique quantique, la détection, les communications et la sécurité. La session a exploré des applications industrielles concrètes et fourni un guide d\'action pour naviguer dans la convergence quantum-IA. Aucun diplôme en physique requis.',
    agenda: [
      { time: '19:00', item: 'Doors open & networking' },
      { time: '19:30', item: 'Welcome & introductions' },
      { time: '19:45', item: 'Quantum-AI Convergence Framework — Devesh Jain, World Economic Forum' },
      { time: '20:45', item: 'Q&A' },
      { time: '21:00', item: 'Drinks & networking' },
    ],
    maxSpots: 50,
    isUpcoming: false,
    attendees: 45,
    flyer: '/Quantum-AI Convergence.avif',
  },
  {
    slug: 'networking-december-2025',
    title: 'Tech Leaders Networking',
    titleFr: 'Networking pour Leaders Tech',
    date: 'Dec 11, 2025',
    time: '6:30 PM CET',
    location: 'La Jonquille, Genève',
    description: 'An evening dedicated to pure networking for CTOs and technology leaders across Romandy.',
    descriptionFr: 'Une soirée dédiée au networking pur pour les CTOs et leaders technologiques de Romandie.',
    maxSpots: 20,
    isUpcoming: false,
    attendees: 12,
  },
  {
    slug: 'cto-triad-october-2025',
    title: 'The CTO Triad — Team, Timing & Technology',
    titleFr: 'La Triade CTO — Équipe, Timing & Technologie',
    date: 'Oct 21, 2025',
    time: '6:30 PM CET',
    location: 'SonarSource, Vernier',
    description:
      'Exploring the three pillars of a successful CTO: building the right team, choosing the right timing for technology decisions, and selecting the right technology stack.',
    descriptionFr:
      'Explorer les trois piliers d\'un CTO réussi : construire la bonne équipe, choisir le bon timing pour les décisions technologiques, et sélectionner la bonne pile technologique.',
    maxSpots: 40,
    isUpcoming: false,
    attendees: 27,
  },
]

export const UPCOMING_EVENT = EVENTS.find((e) => e.isUpcoming)!
export const PAST_EVENTS = EVENTS.filter((e) => !e.isUpcoming)
