'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Building2, MapPin, Calendar, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

interface Reference {
  id: string
  clientName: string
  projectTitle: string
  industry: string
  location: string
  createdAt: Date
  isAnonymized: boolean
}

interface RecentReferencesProps {
  references: Reference[]
}

export function RecentReferences({ references }: RecentReferencesProps) {
  const t = useTranslations()
  const locale = useLocale()

  if (references.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent References</h3>
        <div className="text-center py-8 text-muted-foreground">
          <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No references yet</p>
          <p className="text-sm">Add your first client reference to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent References</h3>
        <Link 
          href={`/${locale}/references`}
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-4">
        {references.map((reference, index) => (
          <motion.div
            key={reference.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium truncate">
                  {reference.isAnonymized ? '●●●●●●●●' : reference.clientName}
                </h4>
                {reference.isAnonymized && (
                  <Badge variant="secondary" className="text-xs">
                    Anonymized
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground truncate mb-2">
                {reference.projectTitle}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  <span>{reference.industry}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{reference.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(reference.createdAt)}</span>
                </div>
              </div>
            </div>
            
            <Link
              href={`/${locale}/references/${reference.id}`}
              className="ml-4 p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 