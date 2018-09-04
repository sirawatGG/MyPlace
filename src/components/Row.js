import React from 'react';
import PropTypes from 'prop-types';
// import { debounce } from 'lodash';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const favoriteImg = require('../assets/icon_favorite.png');
const favoriteActiveImg = require('../assets/icon_favorite_active.png');

const Row = ({ data, onPress }) => (
  <View style={styles.container}>

    <View style={styles.pinImgBackground}>
      <Image source={{ uri: data.icon }} style={styles.pinWhiteImg} />
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.textDetail}>{data.name}</Text>
      <Text>{data.vicinity}</Text>
    </View>

    <TouchableOpacity onPress={onPress} style={{ padding: 20 }}>
      <Image source={data.fav ? favoriteActiveImg : favoriteImg} style={styles.favoriteImg} />
    </TouchableOpacity>
  </View>
);

Row.propTypes = {
  onPress: PropTypes.func.isRequired,
  data:    PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical:   7,
    flexDirection:     'row',
    alignItems:        'center',
    paddingLeft:       20,
    borderColor:       '#c8c7cc',
    borderBottomWidth: 0.5,
  },
  firstHalf: {
    flexDirection:  'row',
    justifyContent: 'center',
  },
  image: {
    marginRight:  20,
    width:        50,
    height:       50,
    borderRadius: 25,
  },
  pinImgBackground: {
    backgroundColor: '#000',
    padding:         15,
    width:           50,
    height:          50,
    borderRadius:    25,
    justifyContent:  'center',
    alignItems:      'center',
    marginRight:     15,
  },
  textDetail: {
    flex: 1,
  },
  pinWhiteImg: {
    width:  20,
    height: 27,
  },
  favoriteImg: {
    width:  25,
    height: 25,
  },
});
export default Row;
