'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Filter, X, Plus, Download } from 'lucide-react'
import Link from 'next/link'
import { ExportDialog } from './ExportDialog'

export function SearchFilters() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [industry, setIndustry] = useState(searchParams.get('industry') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [technologies, setTechnologies] = useState(searchParams.get('technologies') || '')
  const [showExportDialog, setShowExportDialog] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (industry) params.set('industry', industry)
    if (location) params.set('location', location)
    if (technologies) params.set('technologies', technologies)
    
    router.push(`/${locale}/references?${params.toString()}`)
  }

  const handleClear = () => {
    setSearch('')
    setIndustry('')
    setLocation('')
    setTechnologies('')
    router.push(`/${locale}/references`)
  }

  const hasFilters = search || industry || location || technologies

    return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search references..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>
                Search
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${locale}/add`}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reference
                </Link>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowExportDialog(true)}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Industry</label>
                <Input
                  placeholder="e.g. Healthcare, Technology"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Location</label>
                <Input
                  placeholder="e.g. Paris, London"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Technologies</label>
                <Input
                  placeholder="e.g. React, Python"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Actions */}
            {hasFilters && (
              <div className="flex justify-end">
                <Button variant="outline" onClick={handleClear}>
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        currentFilters={{
          search: search || undefined,
          industry: industry || undefined,
          location: location || undefined,
          technologies: technologies || undefined
        }}
      />
    </>
  )
} 