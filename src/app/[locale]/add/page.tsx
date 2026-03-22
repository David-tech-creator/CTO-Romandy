export const dynamic = "force-dynamic";
import { useTranslations } from 'next-intl'
import { TextInputForm } from '@/components/forms/TextInputForm'

export default function AddPage() {
  const t = useTranslations()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-gradient">
          {t('textInput.title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          Use AI to extract structured information from raw client reference text
        </p>
      </div>

      {/* Text Input Form */}
      <TextInputForm />
    </div>
  )
} 