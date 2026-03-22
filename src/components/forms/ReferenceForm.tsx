'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Loader2, Save, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { ClientReference } from '@/types'
import { toast } from 'sonner'

interface ReferenceFormProps {
  reference?: Partial<ClientReference>
  onSave?: (data: any) => void
  onCancel?: () => void
  isLoading?: boolean
}

interface FormData {
  clientName: string
  isAnonymized: boolean
  industry: string
  projectTitle: string
  startDate: string
  endDate: string
  location: string
  servicesDescription: string
  technologies: string
  methodologies: string
  teamSize: string
  teamRoles: string
  valueDelivered: string
  impact: string
  clientContactName: string
  clientContactRole: string
  clientContactInfo: string
  referenceLetter: string
  rawText: string
}

export function ReferenceForm({ 
  reference, 
  onSave, 
  onCancel, 
  isLoading = false 
}: ReferenceFormProps) {
  const t = useTranslations()
  const [showSensitiveData, setShowSensitiveData] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty }
  } = useForm<FormData>({
    defaultValues: {
      clientName: reference?.clientName || '',
      isAnonymized: reference?.isAnonymized || false,
      industry: reference?.industry || '',
      projectTitle: reference?.projectTitle || '',
      startDate: reference?.startDate ? 
        new Date(reference.startDate).toISOString().split('T')[0] : '',
      endDate: reference?.endDate ? 
        new Date(reference.endDate).toISOString().split('T')[0] : '',
      location: reference?.location || '',
      servicesDescription: reference?.servicesDescription || '',
      technologies: reference?.technologies || '',
      methodologies: reference?.methodologies || '',
      teamSize: reference?.teamSize?.toString() || '',
      teamRoles: reference?.teamRoles || '',
      valueDelivered: reference?.valueDelivered || '',
      impact: reference?.impact || '',
      clientContactName: reference?.clientContactName || '',
      clientContactRole: reference?.clientContactRole || '',
      clientContactInfo: reference?.clientContactInfo || '',
      referenceLetter: reference?.referenceLetter || '',
      rawText: reference?.rawText || ''
    }
  })

  const isAnonymized = watch('isAnonymized')

  const onSubmit = async (data: FormData) => {
    try {
      // Convert form data
      const formattedData = {
        ...data,
        teamSize: data.teamSize ? parseInt(data.teamSize) : null,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        isAnonymized: Boolean(data.isAnonymized)
      }

      if (onSave) {
        await onSave(formattedData)
      } else {
        // Default save behavior
        const method = reference?.id ? 'PUT' : 'POST'
        const url = reference?.id 
          ? `/api/references/${reference.id}` 
          : '/api/references'

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData)
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to save reference')
        }

        toast.success(reference?.id ? 'Reference updated!' : 'Reference created!')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save')
    }
  }

  const sections = [
    {
      title: 'Basic Information',
      fields: [
        { name: 'clientName', label: t('reference.clientName'), required: true, type: 'text' },
        { name: 'projectTitle', label: t('reference.projectTitle'), required: true, type: 'text' },
        { name: 'industry', label: t('reference.industry'), required: true, type: 'text' },
        { name: 'location', label: t('reference.location'), required: true, type: 'text' }
      ]
    },
    {
      title: 'Timeline',
      fields: [
        { name: 'startDate', label: t('reference.startDate'), required: false, type: 'date' },
        { name: 'endDate', label: t('reference.endDate'), required: false, type: 'date' }
      ]
    },
    {
      title: 'Project Details',
      fields: [
        { name: 'servicesDescription', label: t('reference.services'), required: false, type: 'textarea' },
        { name: 'technologies', label: t('reference.technologies'), required: false, type: 'textarea' },
        { name: 'methodologies', label: t('reference.methodologies'), required: false, type: 'textarea' }
      ]
    },
    {
      title: 'Team Information',
      fields: [
        { name: 'teamSize', label: t('reference.teamSize'), required: false, type: 'number' },
        { name: 'teamRoles', label: t('reference.teamRoles'), required: false, type: 'textarea' }
      ]
    },
    {
      title: 'Results & Impact',
      fields: [
        { name: 'valueDelivered', label: t('reference.valueDelivered'), required: false, type: 'textarea' },
        { name: 'impact', label: t('reference.impact'), required: false, type: 'textarea' }
      ]
    }
  ]

  const sensitiveFields = [
    { name: 'clientContactName', label: t('reference.contactName'), type: 'text' },
    { name: 'clientContactRole', label: t('reference.contactRole'), type: 'text' },
    { name: 'clientContactInfo', label: t('reference.contactInfo'), type: 'textarea' },
    { name: 'referenceLetter', label: t('reference.referenceLetter'), type: 'textarea' }
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Privacy Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Privacy Settings
            <Badge variant={isAnonymized ? 'destructive' : 'secondary'}>
              {isAnonymized ? 'Anonymized' : 'Identifiable'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isAnonymized">
                {t('reference.isAnonymized')}
              </Label>
              <p className="text-sm text-muted-foreground">
                Hide client name and sensitive information
              </p>
            </div>
            <Switch
              id="isAnonymized"
              checked={isAnonymized}
              onCheckedChange={(checked) => setValue('isAnonymized', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Sections */}
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <Label htmlFor={field.name}>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.name}
                        {...register(field.name as keyof FormData, {
                          required: field.required ? `${field.label} is required` : false
                        })}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        {...register(field.name as keyof FormData, {
                          required: field.required ? `${field.label} is required` : false
                        })}
                        className="mt-1"
                      />
                    )}
                    {errors[field.name as keyof FormData] && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors[field.name as keyof FormData]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Sensitive Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Contact & Reference Information
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowSensitiveData(!showSensitiveData)}
            >
              {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showSensitiveData ? 'Hide' : 'Show'}
            </Button>
          </CardTitle>
        </CardHeader>
        {showSensitiveData && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sensitiveFields.map((field) => (
                <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.name}
                      {...register(field.name as keyof FormData)}
                      className="mt-1"
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      {...register(field.name as keyof FormData)}
                      className="mt-1"
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Raw Text */}
      {reference?.rawText && (
        <Card>
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              {...register('rawText')}
              rows={6}
              className="font-mono text-sm"
              placeholder="Original reference text..."
            />
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading || !isDirty}>
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          {reference?.id ? 'Update Reference' : 'Save Reference'}
        </Button>
      </div>
    </form>
  )
} 