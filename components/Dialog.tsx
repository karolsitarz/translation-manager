'use client'
import { createPortal } from 'react-dom'
import { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Panel } from '@/components/Panel'
import { Button } from '@/components/Button'
import { TbX } from 'react-icons/tb'
import classNames from 'classnames'

export const Dialog = ({
  trigger,
  children,
  fit,
}: {
  trigger: (props: any) => ReactNode
  children: ReactNode
  fit?: boolean
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {trigger({ onClick: () => setOpen(true) })}
      {createPortal(
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div
                className="bg-gray-500 absolute w-full h-full opacity-50"
                onClick={() => setOpen(false)}
              />
              <Panel
                className={classNames(
                  'relative max-w-prose max-h-[calc(100vh-4rem)] [&>div>div]:!gap-0',
                  !fit && 'w-full',
                )}
              >
                <Button
                  variant="transparent"
                  iconOnly
                  onClick={() => setOpen(false)}
                  className="absolute top-1 right-1"
                >
                  <TbX />
                </Button>
                {children}
              </Panel>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
