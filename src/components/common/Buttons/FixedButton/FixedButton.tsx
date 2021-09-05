import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { StyledFixedTouchableOpacity } from '../../../../styles/styled-components/buttons';
import { StyledLabel } from '../../../../styles/styled-components';

interface IFixedButton {
  text: string;
  callback: any;
  disabled?: boolean;
}

const FixedButton: FunctionComponent<IFixedButton> = (props) => {
  return (
    <View style={{}}>
      <StyledFixedTouchableOpacity
        disabled={props.disabled || false}
        activeOpacity={0.7}
        onPress={props.callback}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              alignSelf: 'stretch',
            }}
          ></View>
          <View style={{}}>
            <StyledLabel fixedStyle={true}>{props.text}</StyledLabel>
          </View>
        </View>
      </StyledFixedTouchableOpacity>
    </View>
  );
};

export default FixedButton;
