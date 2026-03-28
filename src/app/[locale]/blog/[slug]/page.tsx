import { unstable_setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { getPost, getPostSlugs } from '@/lib/blog'

const ORANGE  = '#C8834A'
const DARKER  = '#1E1E1E'
const DARK    = '#2D2D2D'
const BORDER  = 'rgba(255,255,255,0.07)'

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  const locales = ['en', 'fr']
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })))
}

export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  unstable_setRequestLocale(locale)
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <div style={{ backgroundColor: DARKER, minHeight: '100vh' }}>

      {/* Cover image — full bleed */}
      <div className="relative w-full overflow-hidden" style={{ height: '45vh', maxHeight: 480 }}>
        <img
          src={post.coverImage}
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Bottom scrim */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          background: `linear-gradient(to bottom, transparent, ${DARKER})`,
        }} />
      </div>

      {/* Article */}
      <article className="px-6 pb-20" style={{ marginTop: '-6rem', position: 'relative', zIndex: 1 }}>
        <div className="max-w-2xl mx-auto">

          {/* Back */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Insights
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{ color: ORANGE, backgroundColor: `${ORANGE}14` }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/35">
              <Calendar size={11} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/35">
              <Clock size={11} /> {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase leading-tight mb-8">
            {post.title}
          </h1>

          {/* Body */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Footer CTA */}
          <div
            className="mt-14 rounded-xl p-8"
            style={{ backgroundColor: DARK, border: `1px solid ${BORDER}` }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: ORANGE }}>
              Romandy CTO
            </p>
            <h3 className="text-xl font-black text-white uppercase mb-3">
              Join the conversation in person.
            </h3>
            <p className="text-sm text-white/50 mb-5 leading-relaxed">
              Monthly evenings for CTOs and technology leaders across Geneva and Romandy. Small enough to be real. Serious enough to be worth your time.
            </p>
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE }}
            >
              Reserve your spot →
            </Link>
          </div>
        </div>
      </article>

      <style>{`
        .prose-blog { color: rgba(255,255,255,0.75); line-height: 1.75; }
        .prose-blog h2 { font-size: 1.4rem; font-weight: 900; color: #fff; text-transform: uppercase; margin: 2.5rem 0 1rem; letter-spacing: -0.01em; }
        .prose-blog h3 { font-size: 1.1rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 2rem 0 0.75rem; }
        .prose-blog p { margin-bottom: 1.4rem; }
        .prose-blog strong { color: #fff; font-weight: 700; }
        .prose-blog ul, .prose-blog ol { margin: 1rem 0 1.4rem 1.4rem; }
        .prose-blog li { margin-bottom: 0.4rem; }
        .prose-blog a { color: ${ORANGE}; text-decoration: underline; }
        .prose-blog blockquote { border-left: 3px solid ${ORANGE}; padding-left: 1.2rem; margin: 1.5rem 0; color: rgba(255,255,255,0.55); font-style: italic; }
        .prose-blog code { background: rgba(255,255,255,0.08); padding: 0.2em 0.45em; border-radius: 4px; font-size: 0.87em; color: #e8c99a; }
        .prose-blog pre { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1.2rem; overflow-x: auto; margin: 1.5rem 0; }
        .prose-blog pre code { background: none; padding: 0; }
        .prose-blog hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2rem 0; }
      `}</style>
    </div>
  )
}
