import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import {
  Users,
  Calendar,
  Star,
  MapPin,
  ArrowRight,
  Layers,
  UserSearch,
  Cpu,
  UsersRound,
  BarChart3,
  ShieldCheck,
} from 'lucide-react'

const MEETUP_URL = 'https://www.meetup.com/romandy-cto-meetup-group/'

const PAST_EVENTS = [
  {
    title: 'Building Apps Will Never Be the Same Again: Welcome to AI-DLC!',
    date: 'Feb 12, 2026',
    location: 'Pictet, Route des Acacias 60, Carouge',
    attendees: 56,
  },
  {
    title: 'Quantum-AI Convergence: A Strategic Framework for Technology Leaders',
    date: 'Jan 29, 2026',
    location: 'Antaes, Avenue des Morgines 12, Lancy',
    attendees: 42,
  },
  {
    title: 'Tech Leaders Networking',
    date: 'Dec 11, 2025',
    location: 'La Jonquille, Genève',
    attendees: 12,
  },
  {
    title: 'The CTO Triad — Team, Timing & Technology',
    date: 'Oct 21, 2025',
    location: 'SonarSource, Vernier',
    attendees: 27,
  },
]

export default function LandingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  const topics = [
    { key: 'leadership', icon: ShieldCheck },
    { key: 'architecture', icon: Layers },
    { key: 'recruiting', icon: UserSearch },
    { key: 'technology', icon: Cpu },
    { key: 'teams', icon: UsersRound },
    { key: 'strategy', icon: BarChart3 },
  ] as const

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.06] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-100 opacity-40 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <span className="inline-block text-sm font-semibold tracking-wide uppercase text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
            {t('hero.badge')}
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            {t('hero.title')}
          </h1>

          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="gradient-bg text-white border-0 hover:opacity-90 gap-2 text-base h-12 px-8"
            >
              <a href={MEETUP_URL} target="_blank" rel="noopener noreferrer">
                {t('hero.cta')}
                <ArrowRight size={16} />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <a href="#events">{t('hero.ctaSecondary')}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="flex justify-center mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">510+</div>
            <div className="text-sm text-muted-foreground mt-1">{t('stats.members')}</div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">23</div>
            <div className="text-sm text-muted-foreground mt-1">{t('stats.events')}</div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">4.8</div>
            <div className="text-sm text-muted-foreground mt-1">{t('stats.rating')}</div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              {t('about.description')}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={15} className="text-blue-600 shrink-0" />
              {t('about.location')}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl gradient-bg p-1">
              <div className="rounded-xl bg-white dark:bg-gray-900 p-8 text-center">
                <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">C</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">Romandy CTO</div>
                <div className="text-muted-foreground mt-1">Meetup Group</div>
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">4.8 / 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-gray-50/60 dark:bg-gray-900/40 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t('topics.title')}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-14 max-w-xl mx-auto">
            {t('about.description').split('.')[0]}.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 card-hover"
              >
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t(`topics.${key}`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`topics.${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section id="events" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-14 text-center">
          {t('events.title')}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {PAST_EVENTS.map((event) => (
            <a
              key={event.title}
              href={MEETUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 card-hover block"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <span className="shrink-0 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full px-2.5 py-1 whitespace-nowrap">
                  {event.attendees} {t('events.attendees')}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="shrink-0" />
                  {event.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="shrink-0" />
                  {event.location}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a href={MEETUP_URL} target="_blank" rel="noopener noreferrer">
              {t('events.viewAll')}
              <ArrowRight size={16} />
            </a>
          </Button>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="gradient-bg py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-lg text-blue-100 mb-10 leading-relaxed">{t('cta.subtitle')}</p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-50 border-0 gap-2 h-12 px-8 text-base font-semibold"
          >
            <a href={MEETUP_URL} target="_blank" rel="noopener noreferrer">
              {t('cta.button')}
              <ArrowRight size={16} />
            </a>
          </Button>
          <p className="text-sm text-blue-200 mt-4">{t('cta.free')}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">{t('footer.rights')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} />
            {t('footer.location')}
          </div>
          <a
            href={MEETUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            {t('footer.meetup')} →
          </a>
        </div>
      </footer>
    </div>
  )
}
