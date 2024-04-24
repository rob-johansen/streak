import type { Column } from '@/types/Column'

/**
 * This simulates the columns a Streak user might have in a
 * pipeline, fetched from the backend when the app loaded.
 */
export const columns: Column[] = [
  {
    filtering: false,
    id: '3f17680fc2e74e719be1e5f87504c0c3',
    name: 'First Name',
    type: 'text'
  },
  {
    filtering: false,
    id: '81b07824925f46d4b9c395ad3b753d2b',
    name: 'Last Name',
    type: 'text'
  },
  {
    filtering: false,
    id: '7eb09f7e919c40fd8b7a655e49185e78',
    name: 'Email',
    type: 'text'
  },
  {
    filtering: false,
    id: 'd38173e75f854ffb86017f046e277aa8',
    name: 'Phone',
    type: 'text'
  },
  {
    filtering: false,
    id: 'ce8991b534c74acf949551fa4e5b7808',
    name: 'Invite Sent',
    type: 'checkbox'
  },
  {
    filtering: false,
    id: '04d3c610bfee4bd0967d339890cd3c93',
    name: 'Upgraded',
    type: 'checkbox'
  },
  {
    filtering: false,
    id: 'aed55cd24127408f87b8c1192e859415',
    name: 'Joined',
    type: 'date'
  },
  {
    filtering: false,
    id: '3ef141dfcfa54773ac2bf996ee5bd28d',
    name: 'Last Login',
    type: 'date'
  },
  {
    filtering: false,
    id: '4e96f6e746eb4893ac3193515f0d98dd',
    name: 'Industry',
    type: 'dropdown',
    values: [
      'Architecture',
      'Construction',
      'Education',
      'Engineering',
      'Finance',
      'Healthcare',
      'Manufacturing'
    ]
  },
  {
    filtering: false,
    id: '57df877a816c4323ba2f16e55580bf57',
    name: 'Languages',
    type: 'tags',
    values: [
      'Chinese',
      'English',
      'French',
      'German',
      'Italian',
      'Japanese',
      'Spanish'
    ]
  }
]
