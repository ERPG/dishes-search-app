import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';

export enum InputType {
  DEFAULT = 'default',
  PASSWORD = 'password',
  SEARCH = 'search',
}

interface IBaseInput {
  testID: string;
  placeholder: string;
  autoCorrect?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  onChangeText: (event: any) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  onEndEditing?: (event: any) => void;
  inputType: InputType;
}

interface ISearchInput extends IBaseInput {
  onLeftIconPressed?: (event: any) => void;
  gotBackArrow?: boolean;
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
}

export type IBaseInputProps = IBaseInput | ISearchInput;
