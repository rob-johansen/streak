export type ColumnType = 'checkbox' | 'date' | 'dropdown' | 'tags' | 'text'

export type Column = {
  filtering: boolean
  id: string
  name: string
  type: ColumnType
  values?: string[]
}
