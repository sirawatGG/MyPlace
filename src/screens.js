import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import MapView from './containers/MapView/MapView';
import NearBy from './containers/Place/NearBy';
import Favorite from './containers/Place/Favorite';

import store from './core/store';

export default () => {
  Navigation.registerComponent('NearBy', () => NearBy, store, Provider);
  Navigation.registerComponent('Favorite', () => Favorite, store, Provider);
  Navigation.registerComponent('MapView', () => MapView, store, Provider);
};
