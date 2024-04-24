import type { Column } from '@/types/Column'

// You may or may not have selected a column while editing, but you have
// definitely selected a column when the chip is no longer being edited.
type EditingProps =
  | {
      column?: Column
      editing: true
    }
  | {
      column: Column
      editing: false
    }

export type Chip = EditingProps & {
  operator: string
  uuid: string
  value: string
}
