import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'

const ORANGE  = '#C8834A'
const DARKER  = '#1E1E1E'
const DARK    = '#2D2D2D'
const CARD    = '#2A2A2A'
const BORDER  = 'rgba(255,255,255,0.07)'

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const posts = getAllPosts()

  return (
    <div style={{ backgroundColor: DARKER, minHeight: '100vh' }}>

      {/* Header */}
      <section className="px-6 pt-20 pb-14" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: ORANGE }}>
            Insights
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight mb-4">
            Swiss Tech<br />Leadership
          </h1>
          <p className="text-white/45 max-w-lg text-lg">
            Perspectives on AI, engineering leadership, and technology strategy — written for the people building things in Romandy.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="px-6 py-14">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-white/30 text-lg">First post coming soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl overflow-hidden transition-all hover:ring-1"
                  style={{
                    backgroundColor: CARD,
                    border: `1px solid ${BORDER}`,
                    ['--tw-ring-color' as string]: ORANGE + '40',
                  }}
                >
                  {/* Cover image */}
                  <div className="h-44 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt=""
                      aria-hidden="true"
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center',
                        transition: 'transform 0.4s ease',
                      }}
                      className="group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <span
                      className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-2.5 py-1 rounded-full self-start"
                      style={{ color: ORANGE, backgroundColor: `${ORANGE}14` }}
                    >
                      {post.category}
                    </span>
                    <h2 className="font-black text-white leading-snug mb-3 group-hover:text-[#C8834A] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-white/45 leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/30 mt-auto pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} /> {post.readTime} min read
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
