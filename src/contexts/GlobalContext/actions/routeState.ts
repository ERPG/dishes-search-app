import { UpdateRouteState, UPDATE_ROUTE_STATE } from './types';

export const updateRouteState = (routeState): UpdateRouteState => {
  return {
    type: UPDATE_ROUTE_STATE,
    routeState,
  };
};
