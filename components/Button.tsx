import React, {
  ComponentProps,
  ElementType,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from 'react'
import classNames from 'classnames'
import { CgSpinner } from 'react-icons/cg'

const VARIANTS = ['transparent', 'light', 'primary', 'strongLight'] as const

type ButtonProps<T extends ElementType> = {
  children: ReactNode
  variant?: (typeof VARIANTS)[number]
  iconOnly?: boolean
  component?: T
  className?: HTMLAttributes<'div'>['className']
  color?: string
  disabled?: boolean
  loading?: boolean
  align?: 'left' | 'center' | 'right'
} & ComponentProps<T>

export const buttonInner = <T extends ElementType = 'button'>(
  {
    children,
    variant = 'light',
    iconOnly = false,
    component: Component = 'button',
    className = '',
    color,
    disabled,
    loading,
    align = 'center',
    ...props
  }: ButtonProps<T>,
  ref: ForwardedRef<T>,
) => (
  <Component
    ref={ref}
    className={classNames(
      'rounded-xl text-center  transition flex items-center gap-[0.5em] [&>svg:first-of-type]:flex-shrink-0 [&>svg:first-of-type]:text-[1.5em] leading-none cursor-pointer select-none whitespace-nowrap',
      color ??
        (variant === 'primary'
          ? 'bg-main text-foreground'
          : 'bg-foreground text-foreground'),
      {
        'bg-opacity-10 hover:bg-opacity-25': variant === 'light',
        'bg-opacity-25 hover:bg-opacity-40': variant === 'strongLight',
        'bg-opacity-0 hover:bg-opacity-10': variant === 'transparent',
        'bg-opacity-100 hover:bg-opacity-80': variant === 'primary',
      },
      {
        'justify-start': align === 'left',
        'justify-center': align === 'center',
        'justify-end': align === 'right',
      },
      (disabled || loading) && 'opacity-50 !pointer-events-none',
      iconOnly ? 'p-[0.5em]' : 'px-[1em] py-[0.5em]',
      !iconOnly && '[&>svg:first-of-type]:-ml-1',
      className,
    )}
    {...(Component === 'button' && !props.type && { type: 'button' })}
    {...props}
  >
    {loading && <CgSpinner className="animate-spin [&~svg]:hidden" />}
    {children}
  </Component>
)

// eslint-disable-next-line react/display-name
export const Button = forwardRef(buttonInner) as <
  T extends ElementType = 'button',
>(
  props: ButtonProps<T>,
) => ReturnType<typeof buttonInner>

export const ActiveButton = ({
  active,
  className,
  children,
  ...props
}: ComponentProps<typeof Button> & { active?: boolean }) => (
  <Button
    variant={active ? 'primary' : 'transparent'}
    color={active ? 'text-background bg-foreground' : undefined}
    className={classNames(
      className,
      active && 'pointer-events-none cursor-default',
    )}
    {...props}
  >
    {children}
  </Button>
)
