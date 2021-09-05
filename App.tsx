import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignUp } from './src/features/Auth/Signup/Signup';
import { SignIn } from './src/features/Auth/Signin/Signin';
import { TabNavigator } from './src/navigation/tabNavigator/tabNavigator';
import ResetPasswordStack from './src/features/Auth/ResetPassword/ResetPasswordStack';

import ca from './src/locales/ca.json';
import es from './src/locales/es.json';
import en from './src/locales/en.json';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import { linking } from './src/navigation/linkingConfig';
import { SearchStack } from './src/features/Search/SearchStack';
import { GlobalProvider } from './src/contexts/GlobalContext/GlobalContext';

import useFontsHook from './src/hooks/useFontsHook';

i18n.translations = { en, es, ca };
i18n.defaultLocale = 'en-US';
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Stack = createStackNavigator();

export default function App() {
  const { fontsLoaded, AppLoading } = useFontsHook();

  return fontsLoaded ? (
    <NavigationContainer linking={linking}>
      <GlobalProvider>
        <Stack.Navigator initialRouteName="TabNavigator">
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchStack"
            component={SearchStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPasswordStack"
            component={ResetPasswordStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </GlobalProvider>
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
}
