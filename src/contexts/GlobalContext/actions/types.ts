import { ISearchState, IRouteState } from '../GlobalContext';

export const UPDATE_SEARCH_STATE = 'UPDATE_SEARCH_STATE';
export type UPDATE_SEARCH_STATE = typeof UPDATE_SEARCH_STATE;

export interface UpdateSearchState {
  type: typeof UPDATE_SEARCH_STATE;
  searchState: ISearchState;
}

export const UPDATE_ROUTE_STATE = 'UPDATE_ROUTE_STATE';
export type UPDATE_ROUTE_STATE = typeof UPDATE_ROUTE_STATE;

export interface UpdateRouteState {
  type: typeof UPDATE_ROUTE_STATE;
  routeState: IRouteState;
}
