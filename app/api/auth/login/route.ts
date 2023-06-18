import { NextResponse } from 'next/server'
import { sealData } from 'iron-session'
import { getRequestCookie, sessionOptions } from '@/utils/authDecorators'
import { cookies } from 'next/headers'
import { emailRegex } from '@/utils/regex'
import { SETTINGS } from '@/utils/settings'

export async function POST(req: Request) {
  try {
    const user = await getRequestCookie(cookies())

    if (user) throw new Error('User already logged in')

    const data: { email: string } = await req.json()
    if (!data?.email || !emailRegex.test(data.email))
      throw new Error('Invalid email')

    const seal = await sealData(
      { email: data.email },
      {
        password: sessionOptions.password,
        ttl: 15 * 60,
      },
    )

    return NextResponse.json({
      url: SETTINGS.root + `/auth/redirect?token=${seal}`,
    })
  } catch (e: any) {
    return new NextResponse(e.message, { status: 400 })
  }
}
