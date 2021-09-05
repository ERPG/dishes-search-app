import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { StyledTouchableOpacity } from '../../../../styles/styled-components/buttons';
import { StyledLabel } from '../../../../styles/styled-components';

interface ICustomButton {
  text: string;
  callback: any;
  hasIcon: boolean;
  disabled?: boolean;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
}

const BaseButton: FunctionComponent<ICustomButton> = (props) => {
  return (
    <View>
      <StyledTouchableOpacity
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
          >
            {props.hasIcon && (
              <MaterialIcons
                name={props.iconName}
                color={props.iconColor}
                size={props.iconSize}
              />
            )}
          </View>
          <View style={{}}>
            <StyledLabel>{props.text}</StyledLabel>
          </View>
        </View>
      </StyledTouchableOpacity>
    </View>
  );
};

export default BaseButton;
