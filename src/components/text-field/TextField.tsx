import { twMerge } from 'tailwind-merge'
import type { Ref } from 'react'
import React from 'react'

import { Label } from '@/components/label/Label'

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  label?: string
  outerClassName?: string
}

export const TextField = React.forwardRef(
  (
    { className, error, label, outerClassName, ...props }: Props, ref: Ref<HTMLInputElement>
  ): React.JSX.Element => {
    const outerStyles = twMerge(
      `
        flex
        flex-col
        relative
      `,
      outerClassName
    )

    const inputStyles = twMerge(
      `
        border-[1px]
        border-[#cccccc]
        cursor-text
        disabled:bg-[#aaaaaa]/[.05]
        disabled:border-[#3c3c3c]
        disabled:cursor-not-allowed
        disabled:hover:border-[#3c3c3c]
        disabled:shadow-none
        disabled:text-[#999999]
        h-[40px]
        max-w-full
        outline-none
        placeholder-[#6a6a6a]
        pl-[16px]
        pr-[8px]
        py-[7px]
        text-[1rem]
      `,
      error && `
        border-[#f6bd17]
        disabled:hover:border-[#f6bd17]
        focus:border-[#f6bd17]
        focus:shadow-[0_0_4px_rgba(215,43,13,0.3)]
        hover:border-[#f6bd17]
        hover:shadow-[0_0_4px_rgba(215,43,13,0.3)]
      `,
      className
    )

    return (
      <div className={outerStyles}>
        {typeof label === 'string' && label && (
          <Label disabled={props.disabled} error={!!error} htmlFor={props.id}>
            {label}
          </Label>
        )}
        <input {...props} className={inputStyles} ref={ref} />
      </div>
    )
})

TextField.displayName = 'TextField'
