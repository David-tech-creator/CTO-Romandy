import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Calendar, Star, MapPin, ArrowRight, Layers, UserSearch, Cpu, UsersRound, BarChart3, ShieldCheck } from 'lucide-react'
import { UPCOMING_EVENT, PAST_EVENTS } from '@/lib/events'

const MEETUP_URL = 'https://www.meetup.com/romandy-cto-meetup-group/'
const ORANGE = '#C8834A'
const DARK = '#2D2D2D'
const DARKER = '#252525'
const CARD = '#333333'

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
    <div className="flex flex-col" style={{ backgroundColor: DARK }}>

      {/* Hero — Next event above the fold */}
      <section className="relative overflow-hidden py-20 px-6" style={{ backgroundColor: DARKER }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,131,74,0.12) 0%, transparent 70%)` }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Logo + wordmark */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image src="/logo.png" alt="Romandy CTO" width={44} height={29} priority />
            <span className="text-lg font-black text-white tracking-widest uppercase">
              Romandy <span style={{ color: ORANGE }}>CTO</span>
            </span>
          </div>

          {/* Upcoming event badge */}
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border"
            style={{ color: ORANGE, borderColor: `${ORANGE}40`, backgroundColor: `${ORANGE}12` }}
          >
            {t('nextEvent.badge')}
          </span>

          {/* Event title */}
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase leading-none tracking-tight mb-6">
            {locale === 'fr' ? UPCOMING_EVENT.titleFr : UPCOMING_EVENT.title}
          </h1>

          {/* Date / location */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50 mb-10">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} style={{ color: ORANGE }} />
              {UPCOMING_EVENT.date} · {UPCOMING_EVENT.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} style={{ color: ORANGE }} />
              {UPCOMING_EVENT.location}
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE }}
            >
              {t('nextEvent.cta')} <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${locale}/join`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md font-semibold text-white border transition-colors hover:border-white/40"
              style={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'transparent' }}
            >
              {t('nav.joinCommunity')}
            </Link>
          </div>

          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {UPCOMING_EVENT.maxSpots} {t('nextEvent.spotsLeft')}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: DARK, borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-3 gap-8 text-center">
          {[
            { icon: Users, value: '510+', label: t('stats.members'), color: ORANGE },
            { icon: Calendar, value: '23', label: t('stats.events'), color: ORANGE },
            { icon: Star, value: '4.8', label: t('stats.rating'), color: '#F5B942' },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label}>
              <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
              <div className="text-4xl font-black text-white">{value}</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-white uppercase mb-6">{t('about.title')}</h2>
            <p className="text-white/55 leading-relaxed mb-6 text-lg">{t('about.description')}</p>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <MapPin size={14} style={{ color: ORANGE }} />
              {t('about.location')}
            </div>
          </div>

          {/* Brand card */}
          <div className="flex justify-center">
            <div
              className="rounded-2xl p-8 text-center w-72"
              style={{ backgroundColor: CARD, border: `1px solid rgba(255,255,255,0.08)` }}
            >
              <Image src="/logo.png" alt="Romandy CTO" width={72} height={48} className="mx-auto mb-5" />
              <div className="text-xs font-bold tracking-widest text-white/50 uppercase mb-1">ROMANDY</div>
              <div className="text-3xl font-black text-white tracking-tight">CTO</div>
              <div className="flex justify-center gap-0.5 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F5B942" className="text-yellow-400" />
                ))}
              </div>
              <div className="text-xs text-white/40 mt-1">4.8 · 100 reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-24 px-6" style={{ backgroundColor: DARKER }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-white uppercase text-center mb-14">{t('topics.title')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="rounded-xl p-6 card-hover"
                style={{ backgroundColor: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${ORANGE}20` }}
                >
                  <Icon size={20} style={{ color: ORANGE }} />
                </div>
                <h3 className="font-bold text-white mb-2">{t(`topics.${key}`)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {t(`topics.${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section id="events" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-black text-white uppercase text-center mb-14">{t('events.title')}</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {PAST_EVENTS.map((event) => (
            <Link
              key={event.slug}
              href={`/${locale}/events/${event.slug}`}
              className="group rounded-xl p-6 block card-hover"
              style={{ backgroundColor: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-semibold text-white leading-snug group-hover:text-[#C8834A] transition-colors">
                  {locale === 'fr' ? event.titleFr : event.title}
                </h3>
                {event.attendees && (
                  <span
                    className="shrink-0 text-xs font-bold rounded-full px-2.5 py-1 whitespace-nowrap"
                    style={{ backgroundColor: `${ORANGE}20`, color: ORANGE }}
                  >
                    {event.attendees} {t('events.attendees')}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} style={{ color: ORANGE }} /> {event.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} style={{ color: ORANGE }} /> {event.location}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <a
            href={MEETUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-white border transition-colors hover:border-white/40"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            {t('events.viewAll')} <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6" style={{ backgroundColor: DARKER }}>
        <div className="max-w-3xl mx-auto text-center">
          <Image src="/logo.png" alt="Romandy CTO" width={56} height={37} className="mx-auto mb-8 opacity-80" />
          <h2 className="text-4xl font-black text-white uppercase mb-4">{t('cta.title')}</h2>
          <p className="text-lg mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/join`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE }}
            >
              {t('nav.joinCommunity')} <ArrowRight size={16} />
            </Link>
            <a
              href={MEETUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-semibold text-white border transition-colors hover:border-white/40"
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              {t('cta.button')} <ArrowRight size={16} />
            </a>
          </div>
          <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>{t('cta.free')}</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', backgroundColor: DARK }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Romandy CTO" width={22} height={15} />
            <span className="font-bold text-white/60 tracking-wide text-xs uppercase">{t('footer.rights')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={12} style={{ color: ORANGE }} />
            {t('footer.location')}
          </div>
          <a href={MEETUP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {t('footer.meetup')} →
          </a>
        </div>
      </footer>
    </div>
  )
}
