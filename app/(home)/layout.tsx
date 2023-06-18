import { getRequestCookie } from '@/utils/authDecorators'
import { cookies } from 'next/headers'

export default async function HomeLayout(props: {
  landing: React.ReactNode
  projects: React.ReactNode
}) {
  const user = await getRequestCookie(cookies())

  if (!user) return props.landing

  return props.projects
}
