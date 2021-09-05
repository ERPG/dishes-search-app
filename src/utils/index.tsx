import React from 'react';
import {
  CommonActions,
  useFocusEffect,
  StackActions,
} from '@react-navigation/native';
import { MIN_SEARCH_CHARACTER_LENGTH } from '../utils/constants';

// Get object from array
export const getObjectArray = (arr: [], property: any): any => {
  return arr.find((element) => {
    if (element[property] !== undefined && element[property] !== null) {
      return element;
    }
    return false;
  });
};
// Set an Array Value
export const setObjectArray = (arr: any, property: any, value: any): any => {
  let newArr = [];
  arr.map((element) => {
    if (element[property] !== undefined && element[property] !== null) {
      const el = { [property]: value };
      Object.assign(element, el);
      newArr = arr;
    }
  });
  return newArr;
};
// Search for Suggestions
export const searchSuggestions = (
  value: string,
  Promise: any,
  setState: any
): void => {
  const valueIsOk = value.length > MIN_SEARCH_CHARACTER_LENGTH;

  if (valueIsOk) {
    Promise(value).then((res) => {
      setState(res);
    });
  } else {
    setState(null);
  }
};
// Reset navigation state
export const resetNavigation = (
  navigation: any,
  index: number,
  component: string
) => {
  const reset = CommonActions.reset;
  navigation.dispatch(
    reset({
      index: index,
      routes: [{ name: component }],
    })
  );
};

export const UsePopToTopNavHook = (navigation: any) => {
  // Pop to Stack first screen on leave
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        navigation?.dispatch(StackActions.popToTop());
      };
    }, [])
  );
  return;
};
