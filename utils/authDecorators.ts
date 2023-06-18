import type { IronSession, IronSessionOptions } from 'iron-session'
import { unsealData } from 'iron-session'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import process from 'process'
import { withIronSessionSsr } from 'iron-session/next'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'word-search'

export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_PASSWORD || '',
  cookieName: COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions)
}

export interface UserData {
  email: string
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user: UserData
    access_token: string
    refresh_token: string
    expires: number
  }
}

declare module 'next' {
  interface NextApiRequest {
    session: IronSession
  }
}

/**
 * Can be called in page/layout server component.
 * @returns SessionUser or null
 */
export async function getRequestCookie(
  c: ReturnType<typeof cookies>,
): Promise<UserData | null> {
  const found = c.get(sessionOptions.cookieName)

  if (!found) return null

  const { user } = await unsealData(found.value, {
    password: sessionOptions.password,
  })

  return user as UserData
}
