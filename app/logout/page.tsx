'use client'
import axios from 'axios'
import useSWRMutation from 'swr/mutation'
import { CgSpinner } from 'react-icons/cg'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SETTINGS } from '@/utils/settings'

export default function Logout() {
  const router = useRouter()
  const { trigger } = useSWRMutation(
    `${SETTINGS.root}/api/auth/logout`,
    (url) => axios.post(url),
    {
      onSuccess: () => {
        router.refresh()
        router.replace('/')
      },
    },
  )

  useEffect(() => {
    trigger()
  }, [])

  return <CgSpinner className="m-auto text-5xl animate-spin" />
}
