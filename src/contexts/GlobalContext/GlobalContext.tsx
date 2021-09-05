import React, { createContext, useReducer, Dispatch } from 'react';
import { UPDATE_ROUTE_STATE, UPDATE_SEARCH_STATE } from './actions/types';

const reducerState = (state, action) => {
  switch (action.type) {
    case UPDATE_ROUTE_STATE:
      let { routeState } = action;
      return {
        ...state,
        routeState,
      };
    case UPDATE_SEARCH_STATE:
      let { searchState } = action;
      return {
        ...state,
        searchState,
      };
    default:
      return state;
  }
};

export interface IRouteState {
  previousRoute?: {
    stack: string;
    screen: string;
    index: number;
    resetComponent: boolean;
  } | null;
}

export interface ISearchState {
  restaurant?: { id: number; name: string; address: string } | null;
  dish?: { id: number; name: string } | null;
}

export interface IGlobalState {
  searchState: ISearchState;
  routeState: IRouteState;
}

interface IGlobalStateContext {
  state?: IGlobalState;
  dispatch?: Dispatch<any>;
}

const initialState: IGlobalStateContext = {
  state: { searchState: null, routeState: null },
};

export const GlobalStore = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerState, initialState.state);

  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStore.Provider>
  );
};
