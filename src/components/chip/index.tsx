import type React from 'react'
import View from './View'
import ViewModel, { type Args } from './ViewModel'

type Props = Args

export function Chip(props: Props): React.JSX.Element {
  return <View vm={new ViewModel(props)} />
}
