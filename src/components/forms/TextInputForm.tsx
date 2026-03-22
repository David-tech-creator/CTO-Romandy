'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface TextInputFormProps {
  onSuccess?: (referenceId: string) => void
}

export function TextInputForm({ onSuccess }: TextInputFormProps) {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [text, setText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = () => {
        setText(reader.result as string)
      }
      reader.readAsText(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
    },
    multiple: false,
    noClick: false,
  })

  const handleProcess = async () => {
    if (!text.trim()) return

    setIsProcessing(true)
    setStatus('processing')
    setError(null)

    try {
      const response = await fetch('/api/references/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process text')
      }

      setStatus('success')
      toast.success('Reference processed successfully!')
      
      // Redirect to the new reference or call onSuccess
      if (onSuccess) {
        onSuccess(data.reference.id)
      } else {
        router.push(`/${locale}/references/${data.reference.id}`)
      }

    } catch (err) {
      setStatus('error')
      const errorMessage = err instanceof Error ? err.message : 'Failed to process text'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text')
    if (pastedText) {
      setText(prev => prev + pastedText)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className="w-5 h-5 animate-spin" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Drag and Drop Area */}
      <Card className="p-6">
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'active' : ''} cursor-pointer`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">
                {isDragActive ? 'Drop the file here' : t('textInput.dragDrop')}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t('textInput.clickToType')} or drag a .txt file
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Text Input Area */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              Reference Text
            </label>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {getStatusIcon()}
              <span>
                {status === 'processing' && t('textInput.processing')}
                {status === 'success' && 'Successfully processed'}
                {status === 'error' && 'Processing failed'}
                {status === 'idle' && `${text.length} characters`}
              </span>
            </div>
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPaste={handlePaste}
            placeholder={t('textInput.placeholder')}
            className="min-h-[200px] resize-none"
          />

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
              >
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setText('')
                setStatus('idle')
                setError(null)
              }}
              disabled={isProcessing || !text}
            >
              Clear
            </Button>
            <Button
              onClick={handleProcess}
              disabled={isProcessing || !text.trim()}
              className="min-w-[120px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                t('textInput.process')
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 