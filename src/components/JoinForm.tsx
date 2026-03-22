'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight, CheckCircle } from 'lucide-react'

const ORANGE = '#C8834A'

export function JoinForm({ locale }: { locale: string }) {
  const t = useTranslations('join')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'exists' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      locale,
    }
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.error === 'already_member') {
        setStatus('exists')
      } else if (!res.ok) {
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle size={48} className="mx-auto mb-4" style={{ color: ORANGE }} />
        <h3 className="text-xl font-black text-white mb-2">{t('success')}</h3>
        <p className="text-white/50 text-sm">{t('successSub')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-xl font-black text-white uppercase mb-1">{t('formTitle')}</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
            {t('firstName')} *
          </label>
          <input
            name="firstName"
            required
            className="w-full px-4 py-2.5 rounded-lg text-white text-sm outline-none focus:ring-2"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              // @ts-expect-error ring color
              '--tw-ring-color': ORANGE,
            }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
            {t('lastName')} *
          </label>
          <input
            name="lastName"
            required
            className="w-full px-4 py-2.5 rounded-lg text-white text-sm outline-none focus:ring-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
          {t('email')} *
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-2.5 rounded-lg text-white text-sm outline-none"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
          {t('company')} <span className="normal-case font-normal">({t('optional')})</span>
        </label>
        <input
          name="company"
          className="w-full px-4 py-2.5 rounded-lg text-white text-sm outline-none"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
      </div>

      {status === 'exists' && (
        <p className="text-sm text-yellow-400">{t('alreadyMember')}</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400">{t('error')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-1"
        style={{ backgroundColor: ORANGE }}
      >
        {status === 'loading' ? t('submitting') : t('submit')} <ArrowRight size={16} />
      </button>

      <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
        {t('privacy')}
      </p>
    </form>
  )
}
