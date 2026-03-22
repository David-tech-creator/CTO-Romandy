'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Download, FileSpreadsheet, File, Loader2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface ExportDialogProps {
  isOpen: boolean
  onClose: () => void
  currentFilters?: {
    search?: string
    industry?: string
    location?: string
    technologies?: string
  }
}

const availableFields = [
  { key: 'clientName', label: 'Client Name', default: true },
  { key: 'industry', label: 'Industry', default: true },
  { key: 'projectTitle', label: 'Project Title', default: true },
  { key: 'location', label: 'Location', default: true },
  { key: 'servicesDescription', label: 'Services Description', default: true },
  { key: 'technologies', label: 'Technologies', default: true },
  { key: 'methodologies', label: 'Methodologies', default: false },
  { key: 'valueDelivered', label: 'Value Delivered', default: true },
  { key: 'impact', label: 'Impact', default: false },
  { key: 'teamSize', label: 'Team Size', default: true },
  { key: 'teamRoles', label: 'Team Roles', default: false },
  { key: 'startDate', label: 'Start Date', default: true },
  { key: 'endDate', label: 'End Date', default: true },
  { key: 'createdAt', label: 'Created Date', default: false },
  { key: 'isAnonymized', label: 'Anonymized Status', default: false }
]

export function ExportDialog({ isOpen, onClose, currentFilters }: ExportDialogProps) {
  const t = useTranslations()
  const [format, setFormat] = useState<'excel' | 'csv'>('excel')
  const [selectedFields, setSelectedFields] = useState<string[]>(
    availableFields.filter(f => f.default).map(f => f.key)
  )
  const [isExporting, setIsExporting] = useState(false)

  const handleFieldToggle = (fieldKey: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldKey)
        ? prev.filter(key => key !== fieldKey)
        : [...prev, fieldKey]
    )
  }

  const handleSelectAll = () => {
    setSelectedFields(availableFields.map(f => f.key))
  }

  const handleSelectDefaults = () => {
    setSelectedFields(availableFields.filter(f => f.default).map(f => f.key))
  }

  const handleExport = async () => {
    if (selectedFields.length === 0) {
      toast.error('Please select at least one field to export')
      return
    }

    setIsExporting(true)

    try {
      const response = await fetch('/api/references/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          format,
          fields: selectedFields,
          filters: currentFilters
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Export failed')
      }

      // Create download link
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      const contentDisposition = response.headers.get('content-disposition')
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
        : `client-references.${format === 'excel' ? 'xlsx' : 'csv'}`
      
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success(`Successfully exported ${selectedFields.length} fields to ${format.toUpperCase()}`)
      onClose()

    } catch (error) {
      console.error('Export error:', error)
      toast.error(error instanceof Error ? error.message : 'Export failed')
    } finally {
      setIsExporting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-auto"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export References
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Format Selection */}
              <div className="space-y-3">
                <Label>Export Format</Label>
                <div className="flex gap-3">
                  <Button
                    variant={format === 'excel' ? 'default' : 'outline'}
                    onClick={() => setFormat('excel')}
                    className="flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Excel (.xlsx)
                  </Button>
                  <Button
                    variant={format === 'csv' ? 'default' : 'outline'}
                    onClick={() => setFormat('csv')}
                    className="flex items-center gap-2"
                  >
                    <File className="w-4 h-4" />
                    CSV (.csv)
                  </Button>
                </div>
              </div>

              {/* Current Filters */}
              {currentFilters && Object.values(currentFilters).some(v => v) && (
                <div className="space-y-3">
                  <Label>Current Filters (will be applied to export)</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentFilters.search && (
                      <Badge variant="secondary">
                        Search: {currentFilters.search}
                      </Badge>
                    )}
                    {currentFilters.industry && (
                      <Badge variant="secondary">
                        Industry: {currentFilters.industry}
                      </Badge>
                    )}
                    {currentFilters.location && (
                      <Badge variant="secondary">
                        Location: {currentFilters.location}
                      </Badge>
                    )}
                    {currentFilters.technologies && (
                      <Badge variant="secondary">
                        Tech: {currentFilters.technologies}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Field Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Select Fields to Export ({selectedFields.length} selected)</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleSelectDefaults}>
                      Select Defaults
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSelectAll}>
                      Select All
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                  {availableFields.map((field) => (
                    <div key={field.key} className="flex items-center space-x-2">
                      <Switch
                        id={field.key}
                        checked={selectedFields.includes(field.key)}
                        onCheckedChange={() => handleFieldToggle(field.key)}
                      />
                      <Label
                        htmlFor={field.key}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {field.label}
                        {field.default && (
                          <span className="text-xs text-muted-foreground ml-1">
                            (default)
                          </span>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} disabled={isExporting}>
                  Cancel
                </Button>
                <Button onClick={handleExport} disabled={isExporting || selectedFields.length === 0}>
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Export {format.toUpperCase()}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 