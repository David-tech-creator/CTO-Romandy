'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  FileText, 
  Plus, 
  Download, 
  Search,
  Menu,
  X,
  Globe
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const navItems = [
    { 
      href: `/${locale}`, 
      label: t('dashboard'), 
      icon: Home 
    },
    { 
      href: `/${locale}/references`, 
      label: t('references'), 
      icon: FileText 
    },
    { 
      href: `/${locale}/add`, 
      label: t('add'), 
      icon: Plus 
    },
    { 
      href: `/${locale}/search`, 
      label: t('search'), 
      icon: Search 
    },
    { 
      href: `/${locale}/export`, 
      label: t('export'), 
      icon: Download 
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 lg:relative lg:z-0"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl font-bold text-gradient">
                  Antaes
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Client References
                </p>
              </div>

              {/* Navigation items */}
              <div className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Language switcher */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="w-full justify-start gap-2"
                >
                  <Globe size={16} />
                  {locale === 'en' ? 'Français' : 'English'}
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
} 