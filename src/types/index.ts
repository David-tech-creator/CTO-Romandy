export interface ClientReference {
  id: string
  createdAt: Date
  updatedAt: Date
  
  // Core fields
  clientName: string
  isAnonymized: boolean
  industry: string
  projectTitle: string
  startDate: Date | null
  endDate: Date | null
  location: string
  
  // Service details
  servicesDescription: string
  technologies: string
  methodologies: string
  
  // Team information
  teamSize: number | null
  teamRoles: string
  
  // Impact and results
  valueDelivered: string
  impact: string
  
  // Optional contact and reference
  clientContactName: string | null
  clientContactRole: string | null
  clientContactInfo: string | null
  referenceLetter: string | null
  
  // Raw text for reference
  rawText: string | null
}

export interface ProcessingJob {
  id: string
  createdAt: Date
  updatedAt: Date
  status: 'pending' | 'processing' | 'completed' | 'failed'
  rawText: string
  result: any | null
  error: string | null
}

export interface ParsedReferenceData {
  clientName: string
  isAnonymized: boolean
  industry: string
  projectTitle: string
  startDate: string | null
  endDate: string | null
  location: string
  servicesDescription: string
  technologies: string
  methodologies: string
  teamSize: number | null
  teamRoles: string
  valueDelivered: string
  impact: string
  clientContactName: string | null
  clientContactRole: string | null
  clientContactInfo: string | null
  referenceLetter: string | null
}

export interface SearchFilters {
  industry?: string
  location?: string
  technologies?: string
  dateRange?: {
    start?: Date
    end?: Date
  }
}

export interface ExportOptions {
  format: 'excel' | 'csv'
  fields: (keyof ClientReference)[]
  references: string[] // Reference IDs
} 