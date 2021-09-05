import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileStack } from '../../features/Profile/ProfileStack';
import { ReviewStack } from '../../features/Reviews/ReviewStack';
import { AuthProvider, AuthContext } from '../../contexts/AuthContext';
import i18n from 'i18n-js';
import { SearchStack } from '../../features/Search/SearchStack';
import Home from '../../../assets/Home.svg';
import AddReview from '../../../assets/AddReview.svg';
import Profile from '../../../assets/Profile.svg';

const Tab = createBottomTabNavigator();

export const TabNavigator = ({ navigation }) => {
  const { userInfo, setUserInfo } = AuthProvider();

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      <Tab.Navigator
        initialRouteName="SearchStack"
        tabBarOptions={{
          keyboardHidesTabBar: true,
        }}
      >
        <Tab.Screen
          name={'SearchStack'}
          component={SearchStack}
          options={{
            tabBarLabel: i18n.t('navigator__search'),
            tabBarIcon: ({ color, size }) => (
              <Home color={color} width={size} height={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Add Review'}
          component={ReviewStack}
          options={{
            tabBarLabel: i18n.t('navigator__add'),
            tabBarIcon: ({ color, size }) => (
              <AddReview color={color} width={size} height={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Profile'}
          component={ProfileStack}
          options={{
            tabBarLabel: i18n.t('navigator__profile'),
            tabBarIcon: ({ color, size }) => (
              <Profile color={color} width={size} height={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </AuthContext.Provider>
  );
};

export default Tab;
