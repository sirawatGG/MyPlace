import { AsyncStorage } from 'react-native';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import reducers from '../redux/reducers';

import logger from './middleware/logger';

const config = {
  key:     'root',
  storage: AsyncStorage,
  // whitelist: [''],
};
const persistedReducer = persistCombineReducers(config, reducers);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(logger)),
);
persistStore(store);

export default store;
