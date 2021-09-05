import React, { useState, FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { StyledInput } from '../../../styles/styled-components/inputs';
import { Entypo } from 'react-native-vector-icons';
import { StyledMargenedWrapper } from '../../../styles/styled-components';
import { InputType, IBaseInputProps } from './types';

const BaseInput: FunctionComponent<IBaseInputProps> = (props) => {
  const [passwordShown, setPasswordShown] = useState<Boolean>(false);

  const inputPassword =
    props.inputType && props.inputType === InputType.PASSWORD;
  const inputSearch = props.inputType && props.inputType === InputType.SEARCH;

  return (
    <StyledMargenedWrapper>
      <StyledInput
        testID={props.testID}
        inputType={props.inputType}
        value={props.value}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={
          props.inputType &&
          props.inputType === InputType.PASSWORD &&
          !passwordShown
        }
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onEndEditing={props.onEndEditing}
        onSubmitEditing={inputSearch ? props['onSubmitEditing'] : () => ''}
      />
      {inputPassword && (
        <Entypo
          style={styles.eye}
          name={passwordShown ? 'eye-with-line' : 'eye'}
          color={'grey'}
          size={24}
          onPress={() => setPasswordShown(!passwordShown)}
        />
      )}
      {inputSearch && (
        <MaterialIcons
          style={styles.leftIcon}
          name={props['gotBackArrow'] ? 'keyboard-arrow-left' : 'search'}
          color={'grey'}
          size={24}
          onPress={props['onLeftIconPressed']}
        />
      )}
    </StyledMargenedWrapper>
  );
};

const styles = StyleSheet.create({
  eye: {
    position: 'absolute',
    right: 16,
    top: 12,
    elevation: 3,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingHorizontal: 8,
    paddingVertical: 12,
    elevation: 3,
    zIndex: 1,
  },
});
export default BaseInput;
