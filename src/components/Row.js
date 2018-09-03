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

// import Icon from '../Icon/Icon';
// import TextBig from '../Typo/TextBig';
// import colors from '../../assets/colors';
// <TouchableOpacity onPress={debounce(onPress, 300, { leading: true, trailing: false })} >
// {/* {!!icon && <Icon size={iconSize} type={type} name={icon} />} */}

const Row = ({ fav, onPress }) => (

  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.rowDiv}>
        <Text style={styles.textDetail}>
          fdsafds hahah
        </Text>
      </View>

      <Image source={fav ? favoriteActiveImg : favoriteImg} style={styles.favoriteImg} />

    </View>
  </TouchableOpacity>

);

Row.propTypes = {
  fav:     PropTypes.bool,
  onPress: PropTypes.bool.isRequired,
};

Row.defaultProps = {
  fav: true,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical:   18,
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingRight:      20,
    paddingHorizontal: 20,
    borderColor:       '#c8c7cc',
    borderBottomWidth: 0.5,
  },
  rowDiv: {
    flexDirection:  'row',
    justifyContent: 'center',
  },
  image: {
    marginRight:  20,
    width:        50,
    height:       50,
    borderRadius: 25,
    // backgroundColor: colors.inputBottomLine,
  },
  textDetail: {
    marginTop: 1.5,
  },

  favoriteImg: {
    width:  25,
    height: 25,
  },
});
export default Row;
