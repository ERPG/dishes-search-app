import styled from 'styled-components/native';
import { InputType } from '../../components/common/Input/types';
interface IInputStyledProp {
  inputType?: InputType;
}

export const StyledInput = styled.TextInput`
  background-color: white;
  height: 48px;
  shadow-color: black;
  shadow-radius: 4px;
  elevation: 3;
  padding-horizontal: ${(props: IInputStyledProp) =>
    props.inputType === InputType.DEFAULT ? '16px' : '0'};
  padding-left: ${(props: IInputStyledProp) =>
    props.inputType === InputType.SEARCH ? '40px' : '16px'};
`;

export const StyledInputSearch = styled(StyledInput)`
  padding-left: 40px;
`;
