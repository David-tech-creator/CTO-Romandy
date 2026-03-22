import { clerkMiddleware } from '@clerk/nextjs/server'
import createIntlMiddleware from 'next-intl/middleware'

const handleI18nRouting = createIntlMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
})

export default clerkMiddleware((auth, req) => {
  return handleI18nRouting(req)
})

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
}
