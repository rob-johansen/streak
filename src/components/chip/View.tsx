import { AutoComplete } from '@/components/auto-complete'
import { observer } from 'mobx-react-lite'
import { TextField } from '@/components/text-field/TextField'
import type React from 'react'
import ViewModel from './ViewModel'

type Props = {
  vm: ViewModel
}

const View = ({ vm }: Props): React.JSX.Element => {
  return (
    <div className="flex items-center relative">
      {vm.showAutoComplete('column') ? (
        <AutoComplete
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            vm.onChangeColumn(event.target.value)
          }}
          onClickOption={vm.onSelectColumn}
          options={vm.columnOptions}
          placeholder="Enter a column name"
          value={vm.state.columnText}
        />
      ) : (
        <div className={`${vm.chipColor} ${vm.chipTextColor} ml-[12px] pl-[12px] pr-[8px] rounded-l-[9999px]`}>
          {vm.state.column?.name}
        </div>
      )}
      {vm.showOperators() && (
        <>
          {vm.showAutoComplete('operator') ? (
            <AutoComplete
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                vm.onChangeOperator(event.target.value)
              }}
              onClickOption={vm.onSelectOperator}
              options={vm.operatorOptions}
              placeholder="Enter an operator"
              value={vm.state.operatorText}
            />
          ) : (
            <div className={`${vm.chipColor} ${vm.chipTextColor} border-l border-l-[#aaaaaa] pl-[8px] pr-[8px]`}>
              {vm.state.operator}
            </div>
          )}
        </>
      )}
      {vm.showValues() && (
        <>
          {vm.showTextField() ? (
            <TextField
              autoFocus
              className="border-l-0 border-r-0 pl-[12px]"
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                vm.onChangeValueText(event.target.value)
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>): void => {
                if (event.key === 'Enter') {
                  vm.onSubmitValue()
                }
              }}
              placeholder="Enter a value"
              value={vm.state.valueText}
            />
          ) : (
            <>
              {vm.showAutoComplete('value') ? (
                <AutoComplete
                  onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                    vm.onChangeValueAutoComplete(event.target.value)
                  }}
                  onClickOption={vm.onSelectValue}
                  options={vm.valueOptions}
                  placeholder="Enter a value"
                  value={vm.state.valueText}
                />
              ) : (
                <div className={`${vm.chipColor} ${vm.chipTextColor} border-l border-l-[#aaaaaa] pl-[8px] pr-[12px] rounded-r-[9999px]`}>
                  {vm.state.value}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default observer(View)
