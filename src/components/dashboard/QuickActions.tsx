'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Search, Download } from 'lucide-react'
import { motion } from 'framer-motion'

export function QuickActions() {
  const t = useTranslations()
  const locale = useLocale()

  const actions = [
    {
      title: t('reference.addNew'),
      description: 'Create a new reference manually',
      href: `/${locale}/references/new`,
      icon: Plus,
      variant: 'default' as const
    },
    {
      title: t('reference.addFromText'),
      description: 'Extract reference from text using AI',
      href: `/${locale}/add`,
      icon: FileText,
      variant: 'outline' as const
    },
    {
      title: t('nav.search'),
      description: 'Find existing references',
      href: `/${locale}/search`,
      icon: Search,
      variant: 'outline' as const
    },
    {
      title: t('nav.export'),
      description: 'Export references to Excel/CSV',
      href: `/${locale}/export`,
      icon: Download,
      variant: 'outline' as const
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                asChild
                variant={action.variant}
                className="h-auto p-4 flex flex-col items-start gap-2 w-full"
              >
                <Link href={action.href}>
                  <div className="flex items-center gap-2 w-full">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    {action.description}
                  </p>
                </Link>
              </Button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
} 