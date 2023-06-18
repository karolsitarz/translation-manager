import React, { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'

export const Collapse = ({
  children,
  horizontal = false,
  className = '',
}: {
  children?: ReactNode
  horizontal?: boolean
  className?: string
}) => {
  const key = horizontal ? 'width' : 'height'
  const secondaryKey = horizontal ? 'height' : 'width'
  return (
    <AnimatePresence initial={false}>
      {!!children && (
        <motion.div
          className={classNames('flex flex-col overflow-clip', className)}
          initial={{ [key]: 0, [secondaryKey]: '100%', opacity: 0 }}
          animate={{ [key]: 'auto', [secondaryKey]: 'auto', opacity: 1 }}
          exit={{ [key]: 0, [secondaryKey]: '100%', opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
