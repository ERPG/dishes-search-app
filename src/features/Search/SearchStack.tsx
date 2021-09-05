import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import { DishSummary } from '../../components/Dish/DishSummary';
import { Search } from '../Search/Search';

const Stack = createStackNavigator();

interface ISearchStackProps {
  navigation?: StackNavigationProp<any, any>;
}

export const SearchStack = (props: ISearchStackProps) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Summary"
        component={DishSummary}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
