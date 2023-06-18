import './globals.css'
import { Poppins } from 'next/font/google'
import classNames from 'classnames'
import { getRequestCookie } from '@/utils/authDecorators'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import icon from '@/assets/icon.png'
import { LoginButton } from './LoginButton'
import { Button } from '@/components/Button'
import { TbLogout, TbUser } from 'react-icons/tb'

const inter = Poppins({ subsets: ['latin'], weight: ['500', '700'] })

export const metadata = {
  title: `Translation Manager`,
  description: 'A i18n JSON translation manager',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getRequestCookie(cookies())

  return (
    <html lang="en">
      <body className={classNames(inter.className, 'min-h-screen w-full flex')}>
        <main className="w-full h-full flex flex-col p-4">
          <div className="w-full max-w-7xl mx-auto flex flex-col">
            <div className="w-full flex items-center p-2 bg-panel rounded-2xl mb-4 gap-0.5">
              <Link
                href="/"
                className="items-center gap-2.5 ml-2 flex text-2xl font-bold cursor-pointer group"
              >
                <Image src={icon} className="w-8 h-8" alt="Logo" />
                Translation Manager
              </Link>
              <div className="flex-grow" />
              {!user ? (
                <LoginButton />
              ) : (
                <>
                  <Link href="/">
                    <Button variant="transparent">
                      <TbUser />
                      User
                    </Button>
                  </Link>
                  <Link href="/logout">
                    <Button variant="transparent" iconOnly>
                      <TbLogout />
                    </Button>
                  </Link>
                </>
              )}
            </div>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
