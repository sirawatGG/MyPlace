import * as types from './consts';

const initialState = {
  favorite: {},
  nearby:   {},
};

export default function root(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_NEAR_LOCATION: {
      const newData = action.payload;
      const nearby = {};
      for (let i = 0; i < newData.length; i++) {
        if (state.favorite[newData[i].id]) {
          nearby[newData[i].id] = { ...newData[i], fav: true };
        } else {
          nearby[newData[i].id] = { ...newData[i], fav: false };
        }
      }
      return { ...state, nearby };
    }
    case types.TOGGLE_FAVORITE_LOCATION: {
      const newFavorite = state.favorite;
      const newNearby = state.nearby;
      const { id, fav } = action.payload;
      if (fav) { // when favorite
        newNearby[id].fav = fav;
        newFavorite[id] = newNearby[id];
      } else { // when unfavorite
        if (newNearby[id]) {
          newNearby[id].fav = fav;
        }
        delete newFavorite[id];
      }
      return { ...state, newFavorite, newNearby };
    }
    default: return state;
  }
}
