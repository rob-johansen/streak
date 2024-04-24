import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
} from '@floating-ui/react'
import { Icon, Check } from '@/components/icon'
import { observer } from 'mobx-react-lite'
import { twMerge } from 'tailwind-merge'
import React, { Fragment, useEffect, useRef } from 'react'
import { TextField } from '@/components/text-field/TextField'
import type { AutoCompleteProps, Option } from './types'
import type { Ref } from 'react'
import type ViewModel from './ViewModel'

const View = React.forwardRef(
  (
    {
      message,
      onClickOption,
      options,
      outerClassName,
      viewModel,
      ...props
    }: AutoCompleteProps & { viewModel: ViewModel },
    ref: Ref<HTMLDivElement>
  ): React.JSX.Element => {
    const { context, floatingStyles, refs } = useFloating<HTMLInputElement>({
      middleware: [offset(8), flip()],
      onOpenChange: (value, _, reason): void => {
        viewModel.setOpen(value)
        if (reason === 'ancestor-scroll') {
          (refs.reference.current as HTMLInputElement)?.blur()
        }
      },
      open: viewModel.open,
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
    })

    const listNavRef = useRef<HTMLButtonElement[]>([])

    const { getFloatingProps, getItemProps, getReferenceProps } = useInteractions([
      useDismiss(context, { ancestorScroll: true }),
      useListNavigation(context, {
        activeIndex: viewModel.activeIndex,
        focusItemOnOpen: false,
        listRef: listNavRef,
        loop: true,
        onNavigate: viewModel.setActiveIndex,
      })
    ])

    // TODO: Can you use autoFocus instead of this?
    useEffect((): void => {
      if (refs.domReference.current) {
        refs.domReference.current.focus()
      }
    }, [refs.domReference])

    const selectOption = (option: Option): void => {
      // TODO: Add support for multiple here?
      viewModel.setActiveIndex(null)
      viewModel.setOpen(false)
      onClickOption(option)
    }

    return (
      <div className={outerClassName} ref={ref}>
        <TextField
          {...getReferenceProps()}
          {...props}
          className="border-l-0 border-r-0 pl-[12px]"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            viewModel.setActiveIndex(null)
            listNavRef.current = []
            if (props.onChange) {
              props.onChange(event)
            }
          }}
          onFocus={(): void => {
            viewModel.setActiveIndex(null)
            viewModel.setOpen(true)
          }}
          ref={refs.setReference}
          role="listbox"
        />
        {viewModel.open && (message || options.length > 0) && (
          <FloatingPortal>
            <div
              {...getFloatingProps()}
              className="bg-white border-[1px] border-[#cccccc] m-0 max-h-[270px] outline-none overflow-y-auto rounded shadow-xl z-50"
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                minWidth: refs.reference.current?.getBoundingClientRect().width,
              }}
            >
              {message ? (
                <div
                  className="px-[16px] py-[20px]"
                  style={{
                    maxWidth:
                      refs.reference.current?.getBoundingClientRect().width,
                  }}
                >
                  {message}
                </div>
              ) : (
                <div className="flex flex-col rounded">
                  {options.map((option, index) => {
                    const { value, name, selected = false } = option
                    const optionStyles = twMerge(
                      'cursor-pointer flex focus:bg-[#3f51b5]/[0.1] group hover:bg-[#3f51b5]/[0.1] items-center justify-between min-h-[35px] outline-none text-left transition',
                      selected && 'hover:bg-[#3f51b5]/[0.1] pr-[16px]'
                    )
                    const nameStyles = twMerge(
                      'group-focus:text-[#3f51b5] hover:text-[#3f51b5] w-full whitespace-nowrap px-[16px] py-[6px] transition',
                      selected && 'font-bold text-[#3f51b5] pr-0'
                    )

                    return (
                      <Fragment key={value}>
                        <button
                          aria-selected={selected}
                          className={optionStyles}
                          ref={(node) => {
                            if (node) {
                              listNavRef.current[index] = node
                            }
                          }}
                          role="option"
                          tabIndex={viewModel.activeIndex === index ? 0 : -1}
                          type="button"
                          {...getItemProps({
                            onClick() {
                              selectOption(option)
                            },
                            onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
                              if (event.key === 'Enter') {
                                selectOption(option)
                              }
                            }
                          })}
                        >
                          <span className={nameStyles}>
                            {name}
                          </span>
                          {selected && (
                            <Icon
                              className="h-[16px] w-[16px]"
                              source={Check}
                            />
                          )}
                        </button>
                      </Fragment>
                    )
                  })}
                </div>
              )}
            </div>
          </FloatingPortal>
        )}
      </div>
    )
  }
)

View.displayName = 'AutoCompleteView'

export default observer(View)
