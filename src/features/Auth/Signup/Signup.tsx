import React, { useState, FunctionComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import * as schemas from '../../../helpers/schemas';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';
import * as Facebook from 'expo-facebook';

import BaseInput from '../../../components/common/Input/Input';
import BaseButton from '../../../components/common/Buttons/BaseButton/BaseButton';
import { resetNavigation } from '../../../utils';
import {
  SignUpWithEmailAndPassword,
  SignInWithExternalApp,
} from '../../../api';
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from 'react-native-dotenv';
import i18n from 'i18n-js';
import { InputType } from '../../../components/common/Input/types';

interface ISignUp {
  navigation: any;
}

interface IApiResponse {
  message: string;
}

export const SignUp: FunctionComponent<ISignUp> = (props) => {
  const { navigation } = props;

  const [apiError, setApiError] = useState<IApiResponse>({
    message: '',
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => submit(values, setSubmitting),
    validationSchema: schemas.SignUp,
  });

  const submit = (values: any, setSubmitting: (boolean) => void): void => {
    const { email, password, name } = values;

    SignUpWithEmailAndPassword(email, password, name)
      .then(() => {
        setSubmitting(false);
        setApiError({ message: '' });
        navigation.navigate('SignIn');
      })
      .catch((e) => {
        setSubmitting(false);
        switch (true) {
          case e.message.indexOf('uk_users_email') !== -1:
            setApiError({ message: i18n.t('error__email_repeated') });
            break;
          default:
            setApiError({ message: i18n.t('error__random_error') });
        }
      });
  };

  const signUpSuccess = async (token: string) => {
    try {
      await SecureStore.setItemAsync('TOKEN', token);
      if (
        props['route'] &&
        props['route'].params &&
        props['route'].params.previousRoute
      ) {
        const previousRoute = props['route'].params.previousRoute;
        resetNavigation(navigation, previousRoute.index, previousRoute.name);
      }
      navigation.navigate('TabNavigator');
    } catch (error) {
      console.log('Error in signUpSuccess:', error);
    }
  };

  const googleSignUp = async () => {
    try {
      const result = await Google.logInAsync({
        clientId: GOOGLE_CLIENT_ID,
      });
      if (result.type === 'success') {
        const data = await SignInWithExternalApp('google', result.accessToken);
        signUpSuccess(data.token);
      }
    } catch (e) {
      console.log('Error signing in with Google:', e);
    }
  };

  const facebookSignUp = async () => {
    try {
      await Facebook.initializeAsync(FACEBOOK_CLIENT_ID);
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (result.type === 'success') {
        const data = await SignInWithExternalApp('facebook', result.token);
        signUpSuccess(data.token);
      }
    } catch (e) {
      console.log('Error signing in with Facebook:', e);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        enableOnAndroid
      >
        <BaseButton
          callback={googleSignUp}
          text={i18n.t('signup__google')}
          hasIcon={false}
        />

        <BaseButton
          callback={facebookSignUp}
          text={i18n.t('signup__facebook')}
          hasIcon={false}
        />
        <View style={styles.separatorWrapper}>
          <View style={styles.separator}></View>
          <Text style={styles.separatorText}>{i18n.t('common__or')}</Text>
          <View style={styles.separator}></View>
        </View>
        <Text style={styles.label}>{i18n.t('common__name')}</Text>
        <BaseInput
          testID={'signup-name'}
          inputType={InputType.DEFAULT}
          placeholder={i18n.t('common__name')}
          onChangeText={(txt) => formik.setFieldValue('name', txt)}
          onBlur={() => formik.setFieldTouched('name')}
          value={formik.values.name}
          autoCorrect={false}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={styles.labelError}>{formik.errors.name}</Text>
        )}
        <Text style={styles.label}>{i18n.t('common__email')}</Text>
        <BaseInput
          testID={'signup-email'}
          inputType={InputType.DEFAULT}
          placeholder={i18n.t('common__email')}
          keyboardType="email-address"
          onChangeText={(txt) => formik.setFieldValue('email', txt)}
          onBlur={() => formik.setFieldTouched('email')}
          value={formik.values.email}
          autoCorrect={false}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.labelError}>{formik.errors.email}</Text>
        )}
        <Text style={styles.label}>{i18n.t('common__password')}</Text>
        <BaseInput
          testID={'signup-password'}
          inputType={InputType.PASSWORD}
          placeholder={i18n.t('common__password')}
          onChangeText={(txt) => formik.setFieldValue('password', txt)}
          onBlur={() => formik.setFieldTouched('password')}
          value={formik.values.password}
          autoCorrect={false}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.labelError}>{formik.errors.password}</Text>
        )}
        <BaseButton
          callback={() => formik.handleSubmit()}
          text={i18n.t('signup__submit')}
          disabled={!formik.isValid}
          hasIcon={false}
        />
        {apiError.message ? (
          <Text style={styles.formError}>{apiError.message}</Text>
        ) : null}
        <Text
          style={styles.label}
          onPress={() => navigation.navigate('SignIn')}
        >
          {i18n.t('common__goto_signin')}
        </Text>
        <Text
          style={styles.label}
          onPress={() => {
            resetNavigation(navigation, 0, 'Profile');
            navigation.navigate('TabNavigator');
          }}
        >
          {i18n.t('common__continue_without_login')}
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  separatorWrapper: {
    flexDirection: 'row',
    margin: 20,
  },
  separator: {
    flex: 3,
    borderColor: '#000',
    borderBottomWidth: 1,
  },
  separatorText: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 2,
    marginTop: 7,
    marginBottom: -7,
  },
  label: {
    marginHorizontal: 20,
    padding: 10,
  },
  labelError: {
    marginHorizontal: 20,
    padding: 10,
    color: 'red',
  },
  formError: {
    marginHorizontal: 20,
    padding: 10,
    color: 'red',
    textAlign: 'center',
  },
});
