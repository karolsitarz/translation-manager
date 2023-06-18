import { getRequestCookie } from '@/utils/authDecorators'
import { cookies } from 'next/headers'
import { prisma } from '@/utils/prismaClient'

async function getUserProjects() {
  const user = await getRequestCookie(cookies())
  if (!user) throw new Error('User not authenticated')

  const userData = await prisma.user.findFirst({
    where: { email: user.email },
    select: {
      permissions: {
        select: {
          project: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  if (!userData) throw new Error('User not found')

  return userData
}

export default async function Projects() {
  const projects = await getUserProjects()

  return (
    <main className="flex flex-col text-center p-6 font-bold">
      {JSON.stringify(projects)}
    </main>
  )
}
