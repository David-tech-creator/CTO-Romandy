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
}

export const EVENTS: Event[] = [
  {
    slug: 'ai-leadership-april-2026',
    title: 'AI & Leadership: Building the CTO of Tomorrow',
    titleFr: 'IA & Leadership : Construire le CTO de Demain',
    date: 'April 24, 2026',
    time: '6:30 PM CET',
    location: 'Geneva, Switzerland (venue TBA)',
    description:
      'An evening of exchange on integrating AI into technology leadership, building high-performance teams, and networking with CTOs and tech leaders from Romandy.',
    descriptionFr:
      'Une soirée d\'échanges sur l\'intégration de l\'IA dans le leadership technologique, la constitution d\'équipes performantes et le networking avec les CTOs et leaders tech de Romandie.',
    agenda: [
      { time: '18:30', item: 'Doors open & networking' },
      { time: '19:00', item: 'Welcome & introductions' },
      { time: '19:15', item: 'Keynote: AI in the CTO role' },
      { time: '20:00', item: 'Panel discussion' },
      { time: '20:45', item: 'Open networking & drinks' },
    ],
    maxSpots: 50,
    isUpcoming: true,
  },
  {
    slug: 'ai-dlc-february-2026',
    title: 'Building Apps Will Never Be the Same Again: Welcome to AI-DLC!',
    titleFr: 'Building Apps Will Never Be the Same Again: Welcome to AI-DLC!',
    date: 'Feb 12, 2026',
    time: '6:30 PM CET',
    location: 'Pictet, Route des Acacias 60, Carouge',
    description:
      'A deep dive into AI-driven development lifecycles and how CTOs are rethinking their engineering organizations.',
    descriptionFr:
      'Une exploration approfondie des cycles de développement pilotés par l\'IA et la façon dont les CTOs repensent leurs organisations d\'ingénierie.',
    maxSpots: 60,
    isUpcoming: false,
    attendees: 56,
  },
  {
    slug: 'quantum-ai-january-2026',
    title: 'Quantum-AI Convergence: A Strategic Framework for Technology Leaders',
    titleFr: 'Convergence Quantum-IA : Un Cadre Stratégique pour les Leaders Technologiques',
    date: 'Jan 29, 2026',
    time: '6:30 PM CET',
    location: 'Antaes, Avenue des Morgines 12, Lancy',
    description:
      'Exploring the intersection of quantum computing and artificial intelligence, and what it means strategically for technology leaders.',
    descriptionFr:
      'Explorer l\'intersection du calcul quantique et de l\'intelligence artificielle, et ce que cela signifie stratégiquement pour les leaders technologiques.',
    maxSpots: 50,
    isUpcoming: false,
    attendees: 42,
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
