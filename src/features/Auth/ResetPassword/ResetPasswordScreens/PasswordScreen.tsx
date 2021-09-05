import React, { FunctionComponent, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseButton from '../../../../components/common/Buttons/BaseButton/BaseButton';
import i18n from 'i18n-js';
import BaseInput from '../../../../components/common/Input/Input';
import { ForgotPasswordSchema } from '../../../../helpers/schemas';
import { useFormik } from 'formik';
import { IPasswordScreenProps } from './types/types';
import * as Linking from 'expo-linking';
import { passwordRecoveryUpdateAction } from '../../../../api';
import { InputType } from '../../../../components/common/Input/types';

const PasswordScreen: FunctionComponent<IPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const currentUrl = Linking.useUrl();
  const [disabled, setDisabled] = useState(true);
  const [info, setInfo] = useState('');

  const formik = useFormik({
    initialValues: {
      passwordField: '',
      repeatPasswordField: '',
    },
    onSubmit: (values, { setSubmitting }) => submit(values, setSubmitting),
    validationSchema: ForgotPasswordSchema(),
  });

  const disableButtonHandler = () => {
    if (formik.isValid && formik.dirty) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const submit = async (
    values: any,
    setSubmitting: (boolean) => void
  ): Promise<void> => {
    const { passwordField } = values;
    const splitUrl = currentUrl.split('/');
    const hash = splitUrl[splitUrl.length - 1];
    setSubmitting(false);
    if (hash.match(/^[0-9a-z]+$/i)) {
      try {
        await passwordRecoveryUpdateAction(passwordField, hash);
        navigation.navigate('success-screen');
      } catch (error) {
        const parsedResponse = JSON.parse(error);
        const linkInvalid = parsedResponse.status === 'NOT_FOUND';
        if (linkInvalid) {
          setInfo('Invalid link!');
        }
      }
    } else {
      setInfo('Invalid link!');
    }
  };

  useEffect(() => {
    setInfo('');
    disableButtonHandler();
  }, [formik.isValid]);

  return (
    <View>
      <BaseInput
        testID="forgot-password-password"
        inputType={InputType.PASSWORD}
        placeholder={'Password'}
        onChangeText={(txt) => formik.setFieldValue('passwordField', txt)}
        onBlur={() => formik.setFieldTouched('passwordField')}
        value={formik.values.passwordField}
        autoCorrect={false}
      />
      {formik.touched.passwordField && formik.errors.passwordField && (
        <Text style={styles.labelError}>{formik.errors.passwordField}</Text>
      )}
      <BaseInput
        testID="forgot-password-repeat-password"
        inputType={InputType.PASSWORD}
        placeholder={'Confirm Password'}
        onChangeText={(txt) => formik.setFieldValue('repeatPasswordField', txt)}
        onBlur={() => formik.setFieldTouched('repeatPasswordField')}
        value={formik.values.repeatPasswordField}
        autoCorrect={false}
      />
      {formik.touched.repeatPasswordField &&
        formik.errors.repeatPasswordField && (
          <Text style={styles.labelError}>
            {formik.errors.repeatPasswordField}
          </Text>
        )}
      <BaseButton
        text={'Continue'}
        callback={formik.handleSubmit}
        hasIcon={false}
        disabled={disabled}
      />
      {info ? (
        <Text style={disabled ? styles.labelError : styles.label}>{info}</Text>
      ) : null}
    </View>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  labelError: {
    marginHorizontal: 16,
    padding: 8,
    color: 'red',
  },
  label: {
    marginHorizontal: 16,
    padding: 8,
  },
  input: {
    margin: 8,
  },
});
