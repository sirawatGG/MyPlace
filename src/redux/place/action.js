import * as types from './consts';

export function addNearLocation(places) {
  return {
    type:    types.ADD_NEAR_LOCATION,
    payload: places,
  };
}

export function toggleFavoriteLocation(id, value) {
  return {
    type:    types.TOGGLE_FAVORITE_LOCATION,
    payload: {
      id,
      fav: value,
    },
  };
}
