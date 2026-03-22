'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

const MEETUP_URL = 'https://www.meetup.com/romandy-cto-meetup-group/'

export function TopNav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <header className="sticky top-0 z-50 nav-blur border-b border-gray-200/80 dark:border-gray-800/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white">
            Romandy <span className="text-gradient">CTO</span>
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('about')}
          </a>
          <a
            href="#events"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('events')}
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-1.5 text-muted-foreground"
          >
            <Globe size={14} />
            {t('language')}
          </Button>
          <Button asChild size="sm" className="gradient-bg text-white border-0 hover:opacity-90">
            <a href={MEETUP_URL} target="_blank" rel="noopener noreferrer">
              {t('join')}
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
