import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, company, locale } = await req.json()

  const { error } = await supabase.from('community_members').insert({
    first_name: firstName,
    last_name: lastName,
    email,
    company: company || null,
    locale: locale || 'en',
  })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'already_member' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
