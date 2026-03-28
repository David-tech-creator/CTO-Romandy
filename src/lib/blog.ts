import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  coverImage: string
  readTime: number
}

export type BlogPostFull = BlogPost & { contentHtml: string }

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

const COVER_IMAGES = ['/agentic10.webp', '/agentic12.png', '/conversations4.gif']

export function assignCoverImage(slug: string): string {
  let hash = 0
  for (const c of slug) hash = (hash * 31 + c.charCodeAt(0)) & 0x7fffffff
  return COVER_IMAGES[hash % COVER_IMAGES.length]
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'))
      return {
        slug,
        title: (data.title as string) ?? slug,
        excerpt: (data.excerpt as string) ?? '',
        date: (data.date as string) ?? '',
        category: (data.category as string) ?? 'Technology',
        coverImage: (data.coverImage as string) ?? assignCoverImage(slug),
        readTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
}

export async function getPost(slug: string): Promise<BlogPostFull | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  const contentHtml = String(await marked.parse(content))
  return {
    slug,
    title: (data.title as string) ?? slug,
    excerpt: (data.excerpt as string) ?? '',
    date: (data.date as string) ?? '',
    category: (data.category as string) ?? 'Technology',
    coverImage: (data.coverImage as string) ?? assignCoverImage(slug),
    readTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
    contentHtml,
  }
}
