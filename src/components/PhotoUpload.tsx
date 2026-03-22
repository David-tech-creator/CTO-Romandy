'use client'

import { useRef, useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'

const ORANGE = '#C8834A'

type UploadedPhoto = { id: string; cloudinary_url: string; caption: string | null }

export function PhotoUpload({
  slug,
  onUploaded,
}: {
  slug: string
  onUploaded: (photo: UploadedPhoto) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFile(file: File) {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('slug', slug)

    try {
      const res = await fetch('/api/upload-photo', { method: 'POST', body: formData })
      if (res.ok) {
        const photo = await res.json()
        onUploaded(photo)
      }
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <label
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity hover:opacity-90"
      style={{ backgroundColor: `${ORANGE}20`, color: ORANGE, border: `1px solid ${ORANGE}40` }}
    >
      {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
      {uploading ? 'Uploading…' : 'Upload Photo'}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
    </label>
  )
}
