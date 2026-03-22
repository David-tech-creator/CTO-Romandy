import Image from 'next/image'
import Link from 'next/link'

type Props = {
  locale?: string
  size?: 'sm' | 'md' | 'lg'
  linked?: boolean
}

const config = {
  sm: { imgW: 72,  imgH: 48,  label: 'text-[8px]',  title: 'text-sm'  },
  md: { imgW: 96,  imgH: 64,  label: 'text-[9px]',  title: 'text-lg'  },
  lg: { imgW: 120, imgH: 80,  label: 'text-[10px]', title: 'text-2xl' },
}

export function BrandLockup({ locale = 'en', size = 'md', linked = true }: Props) {
  const { imgW, imgH, label, title } = config[size]

  const inner = (
    <div className="flex items-center gap-2.5">
      <Image src="/logo.png" alt="Romandy CTO" width={imgW} height={imgH} />
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
