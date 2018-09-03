import * as types from './consts';

export function addNearLocation() {
  return {
    type: types.ADD_NEAR_LOCATION,
  };
}

export function addFavoriteLocation() {
  return {
    type: types.ADD_FAVORITE_LOCATION,
  };
}
