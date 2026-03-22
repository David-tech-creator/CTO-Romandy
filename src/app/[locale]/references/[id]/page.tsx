import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { db } from '@/lib/db'
import { ReferenceDetailView } from '@/components/references/ReferenceDetailView'

interface ReferenceDetailPageProps {
  params: {
    id: string
    locale: string
  }
}

async function getReference(id: string) {
  try {
    const reference = await (db.clientReference.findUnique as any)({
      where: { id },
      include: {
        processingJobs: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    if (!reference) {
      return null
    }

    return reference
  } catch (error) {
    console.error('Error fetching reference:', error)
    return null
  }
}

export default async function ReferenceDetailPage({ params }: ReferenceDetailPageProps) {
  const { id } = params
  const t = useTranslations()

  const reference = await getReference(id)

  if (!reference) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-gradient">
          {reference.isAnonymized ? '[ANONYMIZED CLIENT]' : reference.clientName}
        </h1>
        <p className="text-muted-foreground mt-2">
          {reference.projectTitle} • {reference.industry}
        </p>
      </div>

      {/* Reference Detail View */}
      <ReferenceDetailView reference={reference} />
    </div>
  )
} 