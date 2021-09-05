import React, { FunctionComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SpinnerWrapper } from '../../../styles/styled-components/index';

interface ISpinnerProps {
  color: string;
  size: number;
}

export const Spinner: FunctionComponent<ISpinnerProps> = (props) => {
  return (
    <SpinnerWrapper>
      <ActivityIndicator size={props.size} color={props.color} />
    </SpinnerWrapper>
  );
};

export default Spinner;
