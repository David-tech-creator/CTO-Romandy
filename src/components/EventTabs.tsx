'use client'

import { useState } from 'react'
import { Clock, Upload, ImageOff, User, Building2 } from 'lucide-react'
import type { Event } from '@/lib/events'
import { PhotoUpload } from '@/components/PhotoUpload'

const ORANGE = '#C8834A'
const CARD = '#333333'
const DARK = '#2D2D2D'

type Registration = { id: string; first_name: string; last_name: string; company: string | null }
type Photo = { id: string; cloudinary_url: string; caption: string | null }

type Props = {
  locale: string
  event: Event
  description: string
  registrations: Registration[]
  registrationCount: number
  photos: Photo[]
  isAdmin: boolean
  slug: string
}

const TABS = ['info', 'details', 'attendees', 'photos'] as const
type Tab = (typeof TABS)[number]

export function EventTabs({
  locale,
  event,
  description,
  registrations,
  registrationCount,
  photos: initialPhotos,
  isAdmin,
  slug,
}: Props) {
  const [tab, setTab] = useState<Tab>('info')
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos)

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-8 w-fit"
        style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
            style={
              tab === t
                ? { backgroundColor: ORANGE, color: 'white' }
                : { color: 'rgba(255,255,255,0.5)' }
            }
          >
            {t}
            {t === 'attendees' && registrationCount > 0 && (
              <span className="ml-1.5 text-xs opacity-70">({registrationCount})</span>
            )}
            {t === 'photos' && photos.length > 0 && (
              <span className="ml-1.5 text-xs opacity-70">({photos.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Info tab */}
      {tab === 'info' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: ORANGE }}>
              About this event
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">{description}</p>
          </div>
        </div>
      )}

      {/* Details / Agenda tab */}
      {tab === 'details' && (
        <div className="space-y-8">
          {event.agenda && event.agenda.length > 0 ? (
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase mb-6" style={{ color: ORANGE }}>
                Agenda
              </h2>
              <div className="flex flex-col gap-3">
                {event.agenda.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start p-4 rounded-xl"
                    style={{ backgroundColor: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <span
                      className="text-sm font-mono font-bold shrink-0 mt-0.5"
                      style={{ color: ORANGE }}
                    >
                      {item.time}
                    </span>
                    <span className="text-white/80 text-sm">{item.item}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock size={36} className="mx-auto mb-3 opacity-20 text-white" />
              <p className="text-white/30 text-sm">Agenda coming soon</p>
            </div>
          )}

          {/* Format / logistics */}
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: ORANGE }}>
              Format
            </h2>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <ul className="flex flex-col gap-2 text-sm text-white/60">
                <li>• In-person event — free admission</li>
                <li>• Networking drinks provided</li>
                <li>• Language: English / French</li>
                <li>• Limited to {event.maxSpots} attendees</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Attendees tab */}
      {tab === 'attendees' && (
        <div>
          <h2 className="text-sm font-bold tracking-widest uppercase mb-6" style={{ color: ORANGE }}>
            {registrationCount} Registered
          </h2>
          {registrations.length === 0 ? (
            <div className="text-center py-12">
              <User size={36} className="mx-auto mb-3 opacity-20 text-white" />
              <p className="text-white/30 text-sm">No registrations yet — be the first!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {registrations.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: `${ORANGE}25`, color: ORANGE }}
                  >
                    {r.first_name[0]}
                    {r.last_name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {r.first_name} {r.last_name}
                    </div>
                    {r.company && (
                      <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <Building2 size={10} /> {r.company}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Photos tab */}
      {tab === 'photos' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: ORANGE }}>
              Photos {photos.length > 0 && `(${photos.length})`}
            </h2>
            {isAdmin && (
              <PhotoUpload
                slug={slug}
                onUploaded={(photo) => setPhotos((prev) => [...prev, photo])}
              />
            )}
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-16">
              <ImageOff size={40} className="mx-auto mb-3 opacity-20 text-white" />
              <p className="text-white/30 text-sm">
                {isAdmin ? 'No photos yet — upload the first one.' : 'Photos will appear after the event.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((photo) => (
                <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.cloudinary_url}
                    alt={photo.caption || 'Event photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {photo.caption && (
                    <div className="absolute inset-x-0 bottom-0 p-2 text-xs text-white/90 bg-gradient-to-t from-black/60">
                      {photo.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
