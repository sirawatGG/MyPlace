import * as types from './consts';

const initialState = {
  favorite: [],
  nearby:   [],
};

export default function root(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_NEAR_LOCATION:
      return { ...state };
    case types.ADD_FAVORITE_LOCATION: {
      return { ...state };
    }
    default:
      return state;
  }
}
