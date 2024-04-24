import type { Ref } from 'react';
import React, { useRef } from 'react';
import type { AutoCompleteProps } from './types';
import View from './View';
import ViewModel from './ViewModel';

export const AutoComplete = React.forwardRef(
  (props: AutoCompleteProps, ref: Ref<HTMLDivElement>): React.JSX.Element => {
    const viewModel = useRef(new ViewModel());
    return <View {...props} ref={ref} viewModel={viewModel.current} />;
  }
);

AutoComplete.displayName = 'AutoCompleteBinder';
