import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class MapAddress extends React.Component {
  static propTypes = {
    findNearbyPlaces: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      addressLocation: '',
    };
  }

  onLoading = () => {
    if (this.state.addressLocation !== 'loading...') {
      this.setState({ addressLocation: 'loading...' });
    }
  }

  setAddress = (newAddress) => {
    this.setState({ addressLocation: newAddress });
  }

  getAddress = () => this.state.addressLocation

  render() {
    return (
      <TouchableOpacity style={styles.loDetailDiv} onPress={this.props.findNearbyPlaces} activeOpacity={0.7}>
        <Text style={styles.loDetailTitle}>Address</Text>
        <Text style={styles.loDetailText}>{this.state.addressLocation}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  loDetailDiv: {
    position:          'absolute',
    left:              30,
    top:               13,
    right:             30,
    backgroundColor:   '#fff',
    elevation:         10,
    paddingHorizontal: 10,
    paddingVertical:   10,
  },
  loDetailTitle: {
    fontSize:   15,
    fontWeight: '500',
    textAlign:  'center',
  },
  loDetailText: {
    textAlign: 'center',
  },
});
