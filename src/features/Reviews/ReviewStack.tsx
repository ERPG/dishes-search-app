import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RestaurantScreen } from './ReviewCreation/RestaurantScreen';
import { ReviewProvider } from './ReviewContext';
import { DishScreen } from './ReviewCreation/DishScreen';
import { ReviewScreen } from './ReviewCreation/ReviewScreen';
import { SuccessScreen } from './ReviewCreation/SuccessScreen';
import { Restricted } from '../../components/Restricted/Restricted';
import { AuthContext } from '../../contexts/AuthContext';

const Stack = createStackNavigator();

export const ReviewStack: FunctionComponent<any> = (props) => {
  const { userInfo } = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState(false);

  const checkUser = (info: string): void => {
    if (info) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    checkUser(userInfo);
  }, [userInfo]);

  return (
    <ReviewProvider>
      <Stack.Navigator initialRouteName={'DishScreen'}>
        {isAuth ? (
          <Stack.Screen
            name="DishScreen"
            component={DishScreen}
            options={{ headerTitle: '' }}
          />
        ) : (
          <Stack.Screen
            name="Restricted"
            component={Restricted}
            options={{
              headerTitle: '',
              headerShown: false,
              animationTypeForReplace: !isAuth ? 'pop' : 'push',
            }}
          />
        )}
        <Stack.Screen
          name="RestaurantScreen"
          component={RestaurantScreen}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="SuccessScreen"
          component={SuccessScreen}
          options={{ headerTitle: '', headerShown: false }}
        />
      </Stack.Navigator>
    </ReviewProvider>
  );
};
