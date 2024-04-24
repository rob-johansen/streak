import { columns } from '@/data'
import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'
import type { Chip } from '@/types/Chip'
import type { Column } from '@/types/Column'

type State = {
  chips: Chip[]
  columns: Column[]
}

export default class ViewModel {
  private _state: State = {
    chips: [],
    columns
  }

  constructor() {
    this.sortColumns()
    makeAutoObservable(this)
  }

  get state(): State {
    return this._state
  }

  get filters(): string[] {
    const filters: string[] = []
    for (const chip of this.state.chips) {
      if (!chip.editing) {
        filters.push(`${chip.column?.name} | ${chip.operator} | ${chip.value}`)
      }
    }
    return filters
  }

  get placeholder(): string {
    return this.state.chips.length === 0
      ? 'Enter a column name'
      : ''
  }

  addChip = (): void => {
    this.state.chips.push({
      editing: true,
      operator: '',
      value: '',
      uuid: uuid()
    })
  }

  onChipFinished = (newChip: Chip): void => {
    for (const chip of this.state.chips) {
      if (chip.uuid === newChip.uuid) {
        chip.column = newChip.column
        chip.editing = false
        chip.operator = newChip.operator
        chip.value = newChip.value
        this.addChip()
      }
    }
  }

  onFocusInput = (): void => {
    if (this.state.chips.length === 0) {
      this.addChip()
    }
  }

  showFilters = (): boolean => {
    for (const chip of this.state.chips) {
      if (!chip.editing) return true
    }
    return false
  }

  sortColumns = (): void => {
    this.state.columns.sort((a, b): number => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()
      if (nameA < nameB) return -1
      return nameA > nameB ? 1 : 0
    })
  }
}
