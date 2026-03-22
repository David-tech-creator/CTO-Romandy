'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const ORANGE = '#C8834A'
const CARD = '#333333'

interface Props {
  eventName: string
  locale: string
  translations: {
    firstName: string
    lastName: string
    email: string
    company: string
    jobTitle: string
    submit: string
    success: string
    successSub: string
    alreadyRegistered: string
    error: string
    optional: string
  }
}

export function RegisterForm({ eventName, locale, translations: t }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, eventName, locale }),
    })

    if (res.ok) {
      setStatus('success')
    } else {
      const data = await res.json()
      setStatus(data.error === 'already_registered' ? 'already' : 'error')
    }
  }

  if (status === 'success' || status === 'already') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: ORANGE }} />
        <h3 className="text-2xl font-black text-white uppercase mb-2">{t.success}</h3>
        <p className="text-white/50">{status === 'already' ? t.alreadyRegistered : t.successSub}</p>
      </div>
    )
  }

  const inputClass = `
    w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all
    placeholder:text-white/30 focus:ring-1
  `
  const inputStyle = {
    backgroundColor: '#2D2D2D',
    border: '1px solid rgba(255,255,255,0.1)',
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
            {t.firstName} <span style={{ color: ORANGE }}>*</span>
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            placeholder="John"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
            {t.lastName} <span style={{ color: ORANGE }}>*</span>
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            placeholder="Doe"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
          {t.email} <span style={{ color: ORANGE }}>*</span>
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="john@company.com"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
            {t.company} <span className="text-white/30 normal-case font-normal">({t.optional})</span>
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
            {t.jobTitle} <span className="text-white/30 normal-case font-normal">({t.optional})</span>
          </label>
          <input
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            placeholder="CTO"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-3">
          <AlertCircle size={16} />
          {t.error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
        style={{ backgroundColor: ORANGE }}
      >
        {status === 'loading' ? (
          <><Loader2 size={18} className="animate-spin" /> Loading...</>
        ) : (
          <>{t.submit} <ArrowRight size={16} /></>
        )}
      </button>
    </form>
  )
}
