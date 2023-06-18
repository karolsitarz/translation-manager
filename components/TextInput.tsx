import { ComponentProps } from 'react'

export const TextInput = ({
  value,
  setValue,
  max,
  ...props
}: {
  value: string
  setValue: (value: string) => void
  max?: number
} & ComponentProps<'input'>) => {
  return (
    <input
      {...props}
      maxLength={max}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      className="rounded-lg outline-0 py-1.5 px-3 bg-input border-2 border-panel w-80 focus:border-foreground/20 focus:bg-foreground/10 transition"
    />
  )
}
