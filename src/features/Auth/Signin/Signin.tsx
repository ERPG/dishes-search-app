import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

import BaseInput from '../../../components/common/Input/Input';
import BaseButton from '../../../components/common/Buttons/BaseButton/BaseButton';
import { DEVICE_WIDTH } from '../../../utils/constants';
import {
  SignInWithEmailAndPassword,
  SignInWithExternalApp,
} from '../../../api';
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from 'react-native-dotenv';
import { resetNavigation } from '../../../utils';
import i18n from 'i18n-js';
import { GlobalStore } from '../../../contexts/GlobalContext/GlobalContext';
import { updateRouteState } from '../../../contexts/GlobalContext/actions/routeState';
import { InputType } from '../../../components/common/Input/types';
import * as schemas from '../../../helpers/schemas';

interface ISignIn {
  navigation: any;
}

interface IApiResponse {
  message: string;
}

export const SignIn = (props: ISignIn) => {
  const { navigation } = props;

  const [apiError, setApiError] = useState<IApiResponse>({
    message: '',
  });

  const { state, dispatch } = useContext(GlobalStore);

  const currentRoute = {
    stack: 'root',
    screen: 'SignIn',
    index: 2,
    resetState: false,
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => submit(values, setSubmitting),
    validationSchema: schemas.SignIn,
  });

  const signInSuccess = async (token: string) => {
    try {
      await SecureStore.setItemAsync('TOKEN', token);

      const previousRouteGlobalAvailable =
        state && state.routeState && state.routeState.previousRoute;
      const previousRouteParamAvailable =
        props['route'] &&
        props['route'].params &&
        props['route'].params.previousRoute;

      if (previousRouteParamAvailable) {
        const previousRoute = props['route'].params.previousRoute;
        resetNavigation(navigation, previousRoute.index, previousRoute.name);
        return;
      } else if (previousRouteGlobalAvailable) {
        const { stack, screen } = state.routeState.previousRoute;
        dispatch(updateRouteState({ previousRoute: currentRoute }));
        navigation.navigate(stack, screen);
        return;
      }
      navigation.navigate('TabNavigator');
    } catch (error) {
      console.log('Error in SignIn success:', error);
    }
  };

  // Submit form
  const submit = (values, setSubmitting): void => {
    const { email, password } = values;

    // Api call
    SignInWithEmailAndPassword(email, password)
      .then((data) => {
        setSubmitting(false);
        setApiError({ message: '' });
        signInSuccess(data.token);
      })
      .catch((err) => {
        // Need to improve error handling depending on api response
        setSubmitting(false);
        setApiError({ message: i18n.t('error__user_no_exists') });
      });
  };

  const googleSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        clientId: GOOGLE_CLIENT_ID,
      });
      if (result.type === 'success') {
        const data = await SignInWithExternalApp('google', result.accessToken);
        signInSuccess(data.token);
      }
    } catch (e) {
      console.log('Error signing in with Google:', e);
    }
  };

  const facebookSignIn = async () => {
    try {
      await Facebook.initializeAsync(FACEBOOK_CLIENT_ID);
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (result.type === 'success') {
        const data = await SignInWithExternalApp('facebook', result.token);
        signInSuccess(data.token);
      }
    } catch (e) {
      console.log('Error signing in with Facebook:', e);
    }
  };

  return (
    <SafeAreaView testID="signin" style={styles.wrapper}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        enableOnAndroid
      >
        <BaseButton
          callback={googleSignIn}
          text={i18n.t('signin__google')}
          hasIcon={false}
        />

        <BaseButton
          callback={facebookSignIn}
          text={i18n.t('signin__facebook')}
          hasIcon={false}
        />
        <View style={styles.separatorWrapper}>
          <View style={styles.separator}></View>
          <Text style={styles.separatorText}>{i18n.t('common__or')}</Text>
          <View style={styles.separator}></View>
        </View>
        <Text style={styles.label}>{i18n.t('common__email')}</Text>
        <BaseInput
          testID={'signin-email'}
          inputType={InputType.DEFAULT}
          placeholder={i18n.t('common__email')}
          onChangeText={(txt) => formik.setFieldValue('email', txt)}
          onBlur={() => formik.setFieldTouched('email')}
          keyboardType="email-address"
          value={formik.values.email}
          autoCorrect={false}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.labelError}>{formik.errors.email}</Text>
        )}
        <Text style={styles.label}>{i18n.t('common__password')}</Text>
        <BaseInput
          testID={'signin-password'}
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
          text={i18n.t('signin__submit')}
          hasIcon={false}
          disabled={!formik.isValid}
        />
        {apiError.message ? (
          <Text style={styles.formError}>{apiError.message}</Text>
        ) : null}
        <Text
          style={styles.label}
          onPress={() => navigation.navigate('SignUp')}
        >
          {i18n.t('common__goto_signup')}
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
        <Text
          style={styles.label}
          onPress={() => {
            navigation.navigate('ResetPasswordStack');
          }}
        >
          Forgot password
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
  buttonWrapper: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    width: DEVICE_WIDTH - 40,
    height: 50,
    marginHorizontal: 20,
    marginTop: 40,
  },
});
