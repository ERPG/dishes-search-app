import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { GetCurrentUser } from '../api';
import { IUser } from '../../types/api';

// Create Auth Context
const AuthContext = React.createContext(null);
// Set Auth Provider
const AuthProvider: any = () => {
  const [userInfo, setUserInfo] = useState<
    | (IUser | null)
    | React.Dispatch<React.SetStateAction<IUser | null>>
  >(null);

  useEffect(() => {
    const getStorageItem = async (): Promise<any> => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('TOKEN');
        if (userToken) {
          const user = await GetCurrentUser(userToken);
          setUserInfo(user);
        } else {
          setUserInfo(null)
        }
      } catch (e) {}
    };
    getStorageItem();
  });

  return { userInfo, setUserInfo };
};

export { AuthContext, AuthProvider };
