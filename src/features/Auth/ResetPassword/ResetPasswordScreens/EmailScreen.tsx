import React, { FunctionComponent, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseButton from '../../../../components/common/Buttons/BaseButton/BaseButton';
import i18n from 'i18n-js';
import BaseInput from '../../../../components/common/Input/Input';
import { emailSchema } from '../../../../helpers/schemas';
import { IProps } from '../../../Reviews/ReviewCreation/types/types';
import { passwordRecoverySendEmail } from '../../../../api';
import { InputType } from '../../../../components/common/Input/types';

const EmailScreen: FunctionComponent<IProps> = ({ navigation }) => {
  const [emailValue, setEmailValue] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [info, setInfo] = useState('');

  const emailInputHandler = (value: string) => {
    setEmailValue(value);
    setDisabled(false);
    setInfo('');
  };

  const sendEmailhandler = async (): Promise<any> => {
    const emailValidation = await emailSchema().validate(emailValue);
    if (emailValidation) {
      await passwordRecoverySendEmail(emailValue);
    } else {
      setInfo('Email Invalid');
    }
  };

  const submit = async () => {
    try {
      await sendEmailhandler();
      setInfo('An email was sended to your inbox!');
    } catch (error) {
      const errorString = error.errors[0];
      setInfo(errorString);
      setDisabled(true);
    }
  };

  return (
    <View>
      <BaseInput
        testID="forgot-password-email"
        inputType={InputType.DEFAULT}
        placeholder={'Email'}
        onChangeText={emailInputHandler}
        onBlur={() => {}}
        value={emailValue}
        autoCorrect={false}
      />
      {info ? (
        <Text style={disabled ? styles.labelError : styles.label}>{info}</Text>
      ) : null}
      <BaseButton
        text={'Continue'}
        callback={submit}
        hasIcon={false}
        disabled={disabled}
      />
      <Text
        style={styles.label}
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go Back
      </Text>
    </View>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  labelError: {
    marginHorizontal: 16,
    padding: 8,
    color: 'red',
  },
  label: {
    marginHorizontal: 16,
    padding: 8,
    color: 'blue',
  },
});
