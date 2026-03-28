import { permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Romandy CTO',
  description: 'The community for CTOs and technology leaders in Romandy, Switzerland.',
  openGraph: {
    title: 'Romandy CTO',
    description: 'The community for CTOs and technology leaders in Romandy, Switzerland.',
    url: 'https://www.ctoromandy.ch',
    siteName: 'Romandy CTO',
    images: [
      {
        url: 'https://www.ctoromandy.ch/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Romandy CTO',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romandy CTO',
    description: 'The community for CTOs and technology leaders in Romandy, Switzerland.',
    images: ['https://www.ctoromandy.ch/og-image.jpg'],
  },
}

export default function RootPage() {
  permanentRedirect('/en')
}
