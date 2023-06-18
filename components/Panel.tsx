'use client'
import { ReactNode, useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'
import { Button } from '@/components/Button'
import classNames from 'classnames'
import { Collapse } from '@/components/Collapse'
import { IconType } from 'react-icons'

export const Panel = ({
  title,
  collapsed: _initialCollapsed,
  children,
  icon: Icon,
  titleClassName,
  className,
}: {
  icon?: IconType
  title?: string
  collapsed?: boolean
  children?: ReactNode
  titleClassName?: string
  className?: string
}) => {
  const [collapsed, setCollapsed] = useState(!!_initialCollapsed)
  const noTitle = !Icon && !title

  return (
    <div
      className={classNames(
        'flex flex-col rounded-2xl bg-panel p-6',
        className,
      )}
    >
      {!noTitle && (
        <label
          className={classNames(
            'group font-bold text-3xl flex items-center gap-3 cursor-pointer select-none',
            titleClassName,
          )}
        >
          {Icon && <Icon />} {title}
          <div className="grow" />
          <Button
            iconOnly
            onClick={() => setCollapsed(!collapsed)}
            className="text-base"
            variant="transparent"
          >
            <TbChevronDown
              className={classNames(
                'transform transition opacity-50 group-hover:opacity-100',
                !collapsed && '-rotate-180',
              )}
            />
          </Button>
        </label>
      )}
      <Collapse>
        {!collapsed && (
          <div
            className={classNames(!noTitle && 'pt-6', 'flex flex-col gap-6')}
          >
            {children}
          </div>
        )}
      </Collapse>
    </div>
  )
}
