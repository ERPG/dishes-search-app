import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from './Profile';
import { Settings } from './Settings/Settings';
const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
