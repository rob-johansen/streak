import { Chip } from '@/components/chip'
import { Fragment } from 'react'
import { Icon, Filter } from '@/components/icon'
import { observer } from 'mobx-react-lite'
import { TextField } from '@/components/text-field/TextField'
import type React from 'react'
import ViewModel from './ViewModel'

type Props = {
  vm: ViewModel
}

const View = ({ vm }: Props): React.JSX.Element => {
  return (
    <>
      <div className="flex items-center relative">
        <TextField
          className="pl-[96px]"
          onFocus={vm.onFocusInput}
          outerClassName="absolute w-full"
          placeholder={vm.placeholder}
        />
        <div className="flex gap-[8px] h-[40px] items-center mr-[1px] pl-[16px] relative">
          <Icon className="w-[20px]" source={Filter} />
          <span className="font-bold select-none">
            Filter
          </span>
        </div>
        {vm.state.chips.map((props): React.JSX.Element => {
          return (
            <Chip
              {...props}
              availableColumns={vm.state.columns}
              key={props.uuid}
              onChipFinished={vm.onChipFinished}
            />
          )
        })}
      </div>
      {vm.showFilters() && (
        <div className="mt-[400px] w-full">
          <span className="font-bold">Filtering by:</span>
          {vm.filters.map((filter, index): React.JSX.Element => {
            return (
              <Fragment key={filter}>
                {index > 0 && (
                  <div className="ml-[20px]">
                    AND
                  </div>
                )}
                <div className="ml-[20px]">
                  {filter}
                </div>
              </Fragment>
            )
          })}
        </div>
      )}
    </>
  )
}

export default observer(View)
