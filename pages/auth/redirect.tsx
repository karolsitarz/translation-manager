import { prisma } from '@/utils/prismaClient'
import { sessionOptions, withSessionSsr } from '@/utils/authDecorators'
import { unsealData } from 'iron-session'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ query, req }) {
    try {
      if (!query?.token || Array.isArray(query.token))
        throw new Error('Invalid token')

      const data = await unsealData(query.token, {
        password: sessionOptions.password,
      })

      if (typeof data?.email !== 'string') throw new Error('Invalid token')

      const findUser = await prisma.user.findFirst({
        where: { email: data.email },
      })

      if (!findUser) throw new Error('Error retrieving user data')

      req.session.user = { email: findUser.email }
      await req.session.save()
      return {
        redirect: {
          destination: '/',
          statusCode: 301,
        },
      }
    } catch (e: any) {
      return {
        props: {
          errorMessage: e?.response?.data?.message ?? e?.message,
        },
      }
    }

    return {
      redirect: {
        destination: '/',
        statusCode: 301,
      },
    }
  },
)

export default function Redirect({ errorMessage = '' }) {
  if (!errorMessage) return null
  return <div className="text-red-500">{errorMessage}</div>
}
