import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { BrandLockup } from '@/components/BrandLockup'

const MEETUP_URL = 'https://www.meetup.com/romandy-cto-meetup-group/'
const ORANGE = '#C8834A'
const DARKER = '#252525'

export function Footer({ locale }: { locale: string }) {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', backgroundColor: DARKER }}>
      <div
        className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        <BrandLockup locale={locale} size="sm" linked={false} />
        <div className="flex items-center gap-1.5">
          <MapPin size={12} style={{ color: ORANGE }} />
          Geneva, Switzerland
        </div>
        <a
          href={MEETUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          View on Meetup →
        </a>
      </div>
    </footer>
  )
}
