import { Navigation } from 'react-native-navigation';
import registerScreens from './screens';

registerScreens();

const iconSearch = require('./assets/icon_map_pin.png');
const favoriteTab = require('./assets/icon_favorite_active.png');

Navigation.startTabBasedApp({
  tabs: [
    {
      label:  'NEARBY',
      screen: 'Place.NearBy',
      icon:   iconSearch,
      title:  'Places App',
    },
    {
      label:  'FAVORITE',
      screen: 'Place.Favorite',
      icon:   favoriteTab,
      title:  'Places App',
    },
  ],
  appStyle: {
    statusBarColor:            '#0096A7',
    navBarBackgroundColor:     '#00BBD6',
    navBarButtonColor:         '#fff',
    navBarTextColor:           '#fff',
    tabBarBackgroundColor:     '#00BBD6',
    tabBarButtonColor:         '#fff',
    tabBarSelectedButtonColor: '#EEF291',
  },
});
