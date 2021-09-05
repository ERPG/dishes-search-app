import React, { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmailScreen from './ResetPasswordScreens/EmailScreen';
import PasswordScreen from './ResetPasswordScreens/PasswordScreen';
import SuccessScreen from './ResetPasswordScreens/SuccessScreen';

const Stack = createStackNavigator();

const ResetPasswordStack: FunctionComponent<any> = (props) => {
  return (
    <Stack.Navigator initialRouteName={'email-screen'}>
      <Stack.Screen
        name="email-screen"
        component={EmailScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="password-screen"
        component={PasswordScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="success-screen"
        component={SuccessScreen}
        options={{ headerTitle: '', headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default ResetPasswordStack;
