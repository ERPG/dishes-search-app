import { UPDATE_SEARCH_STATE, UpdateSearchState } from './types';

export const updateSearchState = (searchState): UpdateSearchState => {
  return {
    type: UPDATE_SEARCH_STATE,
    searchState,
  };
};
