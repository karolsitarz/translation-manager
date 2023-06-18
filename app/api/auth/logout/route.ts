import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/utils/authDecorators'

export async function POST(req: NextRequest) {
  const res = NextResponse.json(null)
  const session = await getIronSession(req, res, sessionOptions)

  if (!session) return res
  session.destroy()
  return res
}
