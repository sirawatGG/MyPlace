import { Navigation } from 'react-native-navigation';

import registerScreens from './screens';

registerScreens(); // this is where you register all of your app's screens

// start the app

Navigation.startSingleScreenApp({
  screen: {
    screen:  'Place',
    title:   'Place App',
    topTabs: [
      {
        screenId: 'Place.NearBy',
        title:    'NEARBY',
      },
      {
        screenId: 'Place.Favorite',
        title:    'FAVORITE',
      },
    ],
    animationType: 'slide-down', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    appStyle:      {
      tabBarBackgroundColor:     '#00BBD6',
      navBarButtonColor:         '#00BBD6',
      tabBarButtonColor:         '#000',
      navBarTextColor:           '#00BBD6',
      tabBarSelectedButtonColor: '#ff505c',
      navigationBarColor:        '#F06C31',
      navBarBackgroundColor:     '#F06C31',
      statusBarColor:            '#002b4c',
      tabFontFamily:             'BioRhyme-Bold',
    },
    navigatorStyle:   {},
    navigatorButtons: {},
    topTabsStyle:     {
      tabBarBackgroundColor:     '#00BBD6',
      tabBarButtonColor:         '#00BBD6',
      tabBarSelectedButtonColor: '#00BBD6',
      tabFontFamily:             'BioRhyme-Bold',
    },
  },
});
