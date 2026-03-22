'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ReferenceForm } from '@/components/forms/ReferenceForm'
import { formatDate, formatDateRange } from '@/lib/utils'
import { 
  Edit, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Calendar, 
  MapPin, 
  Building2, 
  Users, 
  Code, 
  Target,
  Clock,
  ArrowLeft
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Link from 'next/link'

interface ReferenceDetailViewProps {
  reference: any // Will be typed properly in production
}

export function ReferenceDetailView({ reference }: ReferenceDetailViewProps) {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async (data: any) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/references/${reference.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update reference')
      }

      toast.success('Reference updated successfully')
      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error('Error updating reference:', error)
      toast.error('Failed to update reference')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleAnonymize = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/references/${reference.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reference,
          isAnonymized: !reference.isAnonymized
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to toggle anonymization')
      }

      toast.success(`Reference ${reference.isAnonymized ? 'de-anonymized' : 'anonymized'} successfully`)
      router.refresh()
    } catch (error) {
      console.error('Error toggling anonymization:', error)
      toast.error('Failed to toggle anonymization')
    } finally {
      setIsLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Reference</h2>
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(false)}
            disabled={isLoading}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
        
        <ReferenceForm
          reference={reference}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          isLoading={isLoading}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href={`/${locale}/references`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to References
          </Link>
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleToggleAnonymize}
            disabled={isLoading}
          >
            {reference.isAnonymized ? (
              <>
                <Eye className="w-4 h-4 mr-2" />
                De-anonymize
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Anonymize
              </>
            )}
          </Button>
          
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant={reference.isAnonymized ? "destructive" : "secondary"}>
          {reference.isAnonymized ? 'Anonymized' : 'Identified'}
        </Badge>
        <Badge variant="outline">
          <Calendar className="w-3 h-3 mr-1" />
          Created {formatDate(reference.createdAt)}
        </Badge>
        {reference.updatedAt !== reference.createdAt && (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Updated {formatDate(reference.updatedAt)}
          </Badge>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Client Name</label>
                  <p className="text-lg font-medium">
                    {reference.isAnonymized ? '[ANONYMIZED]' : reference.clientName}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Industry</label>
                  <p className="text-lg">{reference.industry}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Project Title</label>
                  <p className="text-lg">{reference.projectTitle}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-lg flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {reference.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          {(reference.startDate || reference.endDate) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  {formatDateRange(reference.startDate, reference.endDate)}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Services & Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Services & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reference.servicesDescription && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Services Description</label>
                  <p className="mt-1 whitespace-pre-wrap">{reference.servicesDescription}</p>
                </div>
              )}
              
              {reference.technologies && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Technologies</label>
                  <p className="mt-1 whitespace-pre-wrap">{reference.technologies}</p>
                </div>
              )}
              
              {reference.methodologies && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Methodologies</label>
                  <p className="mt-1 whitespace-pre-wrap">{reference.methodologies}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results & Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Results & Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reference.valueDelivered && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Value Delivered</label>
                  <p className="mt-1 whitespace-pre-wrap">{reference.valueDelivered}</p>
                </div>
              )}
              
              {reference.impact && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Impact</label>
                  <p className="mt-1 whitespace-pre-wrap">{reference.impact}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reference.teamSize && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Team Size</label>
                  <p className="text-lg font-medium">{reference.teamSize} people</p>
                </div>
              )}
              
              {reference.teamRoles && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Team Roles</label>
                  <p className="mt-1 whitespace-pre-wrap text-sm">{reference.teamRoles}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          {(reference.contactName || reference.contactEmail || reference.contactPhone) && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reference.contactName && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contact Name</label>
                    <p>{reference.contactName}</p>
                  </div>
                )}
                
                {reference.contactEmail && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{reference.contactEmail}</p>
                  </div>
                )}
                
                {reference.contactPhone && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p>{reference.contactPhone}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Reference Letter */}
          {reference.referenceLetter && (
            <Card>
              <CardHeader>
                <CardTitle>Reference Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{reference.referenceLetter}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 