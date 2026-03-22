export const dynamic = "force-dynamic";
import { useTranslations } from 'next-intl'
import { db } from '@/lib/db'
import { ReferencesList } from '@/components/references/ReferencesList'
import { SearchFilters } from '@/components/references/SearchFilters'

interface SearchParams {
  page?: string
  search?: string
  industry?: string
  location?: string
  technologies?: string
}

interface ReferencesPageProps {
  searchParams: SearchParams
}

async function getReferences(searchParams: SearchParams) {
  try {
    const page = parseInt(searchParams.page || '1')
    const limit = 10
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (searchParams.search) {
      where.OR = [
        { clientName: { contains: searchParams.search, mode: 'insensitive' } },
        { projectTitle: { contains: searchParams.search, mode: 'insensitive' } },
        { servicesDescription: { contains: searchParams.search, mode: 'insensitive' } },
        { valueDelivered: { contains: searchParams.search, mode: 'insensitive' } }
      ]
    }

    if (searchParams.industry) {
      where.industry = { contains: searchParams.industry, mode: 'insensitive' }
    }

    if (searchParams.location) {
      where.location = { contains: searchParams.location, mode: 'insensitive' }
    }

    if (searchParams.technologies) {
      where.technologies = { contains: searchParams.technologies, mode: 'insensitive' }
    }

    const references = await (db.clientReference.findMany as any)({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        clientName: true,
        isAnonymized: true,
        industry: true,
        projectTitle: true,
        startDate: true,
        endDate: true,
        location: true,
        technologies: true,
        valueDelivered: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    const total = await (db.clientReference.count as any)({ where })

    return {
      references,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Error fetching references:', error)
    return {
      references: [],
      pagination: { page: 1, limit: 10, total: 0, pages: 0 }
    }
  }
}

export default async function ReferencesPage({ searchParams }: ReferencesPageProps) {
  const t = useTranslations()
  
  // Simplified data for now to avoid SSR issues
  const data = {
    references: [],
    pagination: { page: 1, limit: 10, total: 0, pages: 0 }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-gradient">
          {t('reference.title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage and organize your client references
        </p>
      </div>

      {/* Search and Filters */}
      <SearchFilters />

      {/* References List */}
      <ReferencesList 
        references={data.references}
        pagination={data.pagination}
      />
    </div>
  )
} 