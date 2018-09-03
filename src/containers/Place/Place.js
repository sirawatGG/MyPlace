import React from 'react';
import { PixelRatio } from 'react-native';

class Places extends React.Component {
  static navigatorStyle = {
    topTabTextColor:         '#ffffff',
    topTabTextFontFamily:    'BioRhyme-Bold',
    selectedTopTabTextColor: '#ffffff',

    // Icons
    // topTabIconColor:         '#ffffff',
    selectedTopTabIconColor: '#ff505c',

    // Tab indicator
    selectedTopTabIndicatorHeight: PixelRatio.get() * 2,
    selectedTopTabIndicatorColor:  'yellow',
  };
}

export default Places;
