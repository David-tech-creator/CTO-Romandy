import Image from 'next/image'
import Link from 'next/link'

type Props = {
  locale?: string
  size?: 'sm' | 'md' | 'lg'
  linked?: boolean
}

// The logo PNG has significant transparent glow padding (~8% top, ~28% bottom, ~5% sides).
// We render oversized and clip the wrapper to show only the knife content.
const config = {
  sm: { imgW: 56,  imgH: 37,  clipH: 20, topOff: 3,  label: 'text-[8px]',  title: 'text-sm'  },
  md: { imgW: 72,  imgH: 48,  clipH: 26, topOff: 4,  label: 'text-[9px]',  title: 'text-lg'  },
  lg: { imgW: 90,  imgH: 60,  clipH: 33, topOff: 5,  label: 'text-[10px]', title: 'text-2xl' },
}

export function BrandLockup({ locale = 'en', size = 'md', linked = true }: Props) {
  const { imgW, imgH, clipH, topOff, label, title } = config[size]

  const inner = (
    <div className="flex items-center gap-2">
      {/* Clipping wrapper removes transparent glow so the knife visual matches text height */}
      <div style={{ overflow: 'hidden', height: `${clipH}px`, flexShrink: 0 }}>
        <Image
          src="/logo.png"
          alt="Romandy CTO"
          width={imgW}
          height={imgH}
          style={{ marginTop: `${-topOff}px`, display: 'block' }}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${label} font-black text-white/60 tracking-[0.22em] uppercase`}>
          ROMANDY
        </span>
        <span className={`${title} font-black text-white tracking-tight leading-none`}>
          CTO
        </span>
      </div>
    </div>
  )

  return linked ? (
    <Link href={`/${locale}`}>{inner}</Link>
  ) : (
    inner
  )
}
