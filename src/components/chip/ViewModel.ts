import { makeAutoObservable } from 'mobx'
import type { Chip } from '@/types/Chip'
import type { Column, ColumnType } from '@/types/Column'
import type { Option } from '@/components/auto-complete'

type State = Chip & {
  availableColumns: Column[]
  columnOptions: Option[]
  columnText: string
  onChipFinished: (chip: Chip) => void
  operatorOptions: Option[]
  operatorText: string
  uuid: string
  valueOptions: Option[]
  valueText: string
}

export type Args = Pick<State, 'availableColumns' | 'column' | 'onChipFinished' | 'operator' | 'uuid' | 'value'>

export default class ViewModel {
  private _state: State = {
    availableColumns: [],
    column: undefined,
    columnOptions: [],
    columnText: '',
    editing: true,
    onChipFinished: (): void => {},
    operator: '',
    operatorOptions: [],
    operatorText: '',
    uuid: '',
    value: '',
    valueOptions: [],
    valueText: ''
  }

  constructor({
    availableColumns,
    column,
    onChipFinished,
    operator,
    uuid,
    value
  }: Args) {
    this.state.availableColumns = availableColumns
    for (const { id , name } of availableColumns) {
      this.state.columnOptions.push({ name, value: id })
    }
    this.state.onChipFinished = onChipFinished
    this.state.uuid = uuid

    if (column) this.state.column = column
    if (operator) this.state.operator = operator
    if (value) this.state.value = value

    makeAutoObservable(this)
  }

  get state(): State {
    return this._state
  }

  get chipColor(): string {
    const { column, operator, value } = this.state
    return column && operator && value
      ? 'bg-[#3f51b5]'
      : 'bg-[#3f51b5]/[0.15]'
  }

  get chipTextColor(): string {
    const { column, operator, value } = this.state
    return column && operator && value
      ? 'text-white'
      : 'text-[#151118]'
  }

  get columnOptions(): Option[] {
    if (this.state.columnText.length > 0) {
      return this.state.columnOptions.filter(({ name }): boolean => {
        return name.toLowerCase().startsWith(this.state.columnText.toLowerCase())
      })
    }
    return this.state.columnOptions
  }

  get operatorOptions(): Option[] {
    if (this.state.operatorText.length > 0) {
      return this.state.operatorOptions.filter(({ name }): boolean => {
        return name.toLowerCase().startsWith(this.state.operatorText.toLowerCase())
      })
    }
    return this.state.operatorOptions
  }

  get valueOptions(): Option[] {
    if (this.state.valueText.length > 0) {
      return this.state.valueOptions.filter(({ name }): boolean => {
        return name.toLowerCase().startsWith(this.state.valueText.toLowerCase())
      })
    }
    return this.state.valueOptions
  }

  addChip = (): void => {
    if (!this.state.column) return
    this.state.onChipFinished({
      column: this.state.column,
      editing: false,
      operator: this.state.operator,
      value: this.state.value,
      uuid: this.state.uuid
    })
  }

  onChangeColumn = (value: string): void => {
    this.state.columnText = value
    for (const option of this.state.columnOptions) {
      option.selected = false
    }
  }

  onChangeOperator = (value: string): void => {
    this.state.operatorText = value
    for (const option of this.state.operatorOptions) {
      option.selected = false
    }
  }

  onChangeValueText = (value: string): void => {
    this.state.valueText = value
  }

  onChangeValueAutoComplete = (value: string): void => {
    this.state.valueText = value
    for (const option of this.state.valueOptions) {
      option.selected = false
    }
  }

  onSelectColumn = ({ name, value }: Option): void => {
    this.onChangeColumn(name)
    for (const option of this.state.columnOptions) {
      option.selected = option.name.toLowerCase() === name.toLowerCase()
    }
    for (const column of this.state.availableColumns) {
      if (column.id === value) {
        this.state.column = column
        this.setOperatorOptions(column.type)
        if (column.type === 'checkbox') {
          this.state.operator = 'is'
          this.setValueOptions(column)
        }
        break
      }
    }
  }

  onSelectOperator = ({ name }: Option): void => {
    this.onChangeOperator(name)
    for (const option of this.state.operatorOptions) {
      option.selected = option.name.toLowerCase() === name.toLowerCase()
    }
    this.state.operator = name
    const column = this.state.column
    if (column && column.type !== 'text' && column.type !== 'date') {
      this.setValueOptions(column)
    }
  }

  onSelectValue = ({ name }: Option): void => {
    this.onChangeValueText(name)
    for (const option of this.state.valueOptions) {
      option.selected = option.name.toLowerCase() === name.toLowerCase()
    }
    this.state.value = name
    this.addChip()
  }

  onSubmitValue = (): void => {
    if (this.state.valueText === '') return
    this.state.value = this.state.valueText
    this.addChip()
  }

  setOperatorOptions = (columnType: ColumnType): void => {
    const options = this.state.operatorOptions
    if (columnType === 'text') {
      options.push(
        { name: 'contains', value: 'contains' },
        { name: 'does not contain', value: 'does not contain' },
        { name: 'does not equal', value: 'does not equal' },
        { name: 'equals', value: 'equals' },
      )
    } else if (columnType === 'date') {
      options.push(
        { name: 'does not equal', value: 'does not equal' },
        { name: 'equals', value: 'equals' },
        { name: 'is after', value: 'is after' },
        { name: 'is before', value: 'is before' },
      )
    } else if (columnType === 'checkbox') {
      options.push(
        { name: 'is', value: 'is' },
      )
    } else {
      options.push(
        { name: 'excludes', value: 'excludes' },
        { name: 'includes', value: 'includes' },
      )
    }
  }

  setValueOptions = (column: Column): void => {
    const options = this.state.valueOptions
    if (column.type === 'checkbox') {
      options.push(
        { name: 'checked', value: 'checked' },
        { name: 'unchecked', value: 'unchecked' },
      )
    } else {
      for (const value of column.values || []) {
        options.push(
          { name: value, value },
        )
      }
    }
  }

  showAutoComplete = (type: 'column' | 'operator' | 'value'): boolean => {
    if (type === 'column') return this.state.column === undefined
    if (type === 'operator') return this.state.operator === ''
    const columnType = this.state.column?.type
    return this.state.value === '' && (columnType !== 'text' && columnType !== 'date')
  }

  showOperators = (): boolean => {
    return this.state.column !== undefined
  }

  showTextField = (): boolean => {
    const columnType = this.state.column?.type
    return this.state.value === '' && (columnType === 'text' || columnType === 'date')
  }

  showValues = (): boolean => {
    return this.state.operator !== ''
  }
}
