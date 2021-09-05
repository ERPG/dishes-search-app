import { DEVICE_WIDTH } from './../../utils/constants';
import styled from 'styled-components/native';

interface ButtonProps {
  disabled: boolean;
}

export const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: center;
  background-color: ${(props: ButtonProps) =>
    props.disabled ? 'lightgrey' : 'lightblue'};
  padding: 10px;
  width: ${DEVICE_WIDTH - 40}px;
  height: 50px;
  margin-horizontal: 20px;
  margin-top: 40px;
  opacity: ${(props: ButtonProps) => (props.disabled ? 0.5 : 1)};
`;

export const StyledFixedTouchableOpacity = styled.TouchableOpacity`
  bottom: 15px;
  padding: 10px;
  background-color: grey;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: ${DEVICE_WIDTH - 90}px;
  height: 60px;
`;
