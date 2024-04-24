'use client'

import type React from 'react'
import View from './View'
import ViewModel from './ViewModel'

export function Filter(): React.JSX.Element {
  return <View vm={new ViewModel()} />
}
