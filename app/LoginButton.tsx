'use client'
import { Dialog } from '@/components/Dialog'
import { Button } from '@/components/Button'
import { TbCheck, TbLogin } from 'react-icons/tb'
import { TextInput } from '@/components/TextInput'
import { useMemo, useState } from 'react'
import { emailRegex } from '@/utils/regex'
import useSWRMutation from 'swr/mutation'
import { SETTINGS } from '@/utils/settings'
import axios from 'axios'
import toast from 'react-hot-toast'

export const LoginButton = () => {
  const [email, setEmail] = useState('')

  const isValid = useMemo(() => emailRegex.test(email), [email])

  const { trigger, isMutating } = useSWRMutation(
    `${SETTINGS.root}/api/auth/login`,
    (url, { arg }: { arg: string }) =>
      axios.post<{ url: string }>(url, { email: arg }),
    {
      onSuccess: ({ data }) => {
        toast.success('Email sent successfully')
        console.log(data.url)
      },
      onError: async (e) => {
        const message = e?.response?.data
        if (message) toast.error(message)
      },
    },
  )

  return (
    <>
      <Dialog
        fit
        trigger={(props) => (
          <Button type="button" {...props} variant="primary">
            <TbLogin /> Sign in
          </Button>
        )}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (isMutating) return
            trigger(email)
          }}
          className="flex gap-1 flex-col mt-5"
        >
          <TextInput
            value={email}
            setValue={setEmail}
            placeholder="Email address..."
          />
          <Button
            className="w-full"
            variant="primary"
            disabled={!isValid}
            loading={isMutating}
          >
            <TbCheck /> Submit
          </Button>
        </form>
      </Dialog>
    </>
  )
}
