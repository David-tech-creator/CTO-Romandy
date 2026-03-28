import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
})

export default function middleware(request: NextRequest) {
  // Permanent redirect at root so crawlers (WhatsApp, Slack, etc.) follow it
  // and pick up OG meta tags. next-intl defaults to 307 which bots ignore.
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url), 301)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
}
