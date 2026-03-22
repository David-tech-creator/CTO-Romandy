'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, formatDateRange } from '@/lib/utils'
import { Building2, MapPin, Calendar, Eye, Edit } from 'lucide-react'
import { motion } from 'framer-motion'

interface Reference {
  id: string
  clientName: string
  isAnonymized: boolean
  industry: string
  projectTitle: string
  startDate: Date | null
  endDate: Date | null
  location: string
  technologies: string
  valueDelivered: string
  createdAt: Date
  updatedAt: Date
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

interface ReferencesListProps {
  references: Reference[]
  pagination: Pagination
}

export function ReferencesList({ references, pagination }: ReferencesListProps) {
  const t = useTranslations()
  const locale = useLocale()

  if (references.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No references found</h3>
        <p className="text-muted-foreground mb-6">
          Get started by adding your first client reference.
        </p>
        <Button asChild>
          <Link href={`/${locale}/add`}>
            Add First Reference
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* References Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {references.map((reference, index) => (
          <motion.div
            key={reference.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full card-hover">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                      {reference.isAnonymized ? '●●●●●●●●' : reference.clientName}
                    </h3>
                    <p className="text-muted-foreground text-sm truncate">
                      {reference.projectTitle}
                    </p>
                  </div>
                  {reference.isAnonymized && (
                    <Badge variant="secondary" className="ml-2">
                      Anonymized
                    </Badge>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="truncate">{reference.industry}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{reference.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="truncate">
                      {formatDateRange(reference.startDate, reference.endDate)}
                    </span>
                  </div>
                </div>

                {/* Technologies */}
                {reference.technologies && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1">
                      {reference.technologies.split(',').slice(0, 3).map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech.trim()}
                        </Badge>
                      ))}
                      {reference.technologies.split(',').length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{reference.technologies.split(',').length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Value Delivered Preview */}
                {reference.valueDelivered && (
                  <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                    {reference.valueDelivered}
                  </p>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(reference.createdAt)}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/${locale}/references/${reference.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/${locale}/references/${reference.id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === pagination.page ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href={`/${locale}/references?page=${page}`}>
                {page}
              </Link>
            </Button>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {references.length} of {pagination.total} references
      </div>
    </div>
  )
} 