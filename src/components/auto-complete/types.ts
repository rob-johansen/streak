import type { Props as TextFieldProps } from '@/components/text-field/TextField'

export type Option = {
  /**
   * Name for this option, displayed in the floating panel
   */
  name: string;
  /**
   * Whether this option is currently selected
   */
  selected?: boolean;
  /**
   * Value for this option (also used as the React `key`)
   */
  value: string;
};

export type AutoCompleteProps = TextFieldProps & {
  /**
   * Message to display in the floating panel (instead of the list of options)
   */
  message?: string;
  /**
   * Callback invoked when an option is clicked
   */
  onClickOption: (option: Option) => void | Promise<void>;
  /**
   * List of options to display in the floating panel
   */
  options: Option[];
}
