import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from 'react-native-maps';
import Qs from 'qs';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import actions from '../../redux/actions';
import MapAddress from './MapAddress';

const mapPin = require('../../assets/icon_map_pin.png');
const selectLocation = require('../../assets/bg_share_location.png');

@connect(null, {
  ...actions.placeActions,
})
export default class MapView extends Component {
  static propTypes = {
    navigator:       PropTypes.object.isRequired,
    addNearLocation: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.refMapAddress = null;
    this.onFetchGooglePlace = false; // to check if it's fetching
    this.state = {
      region: {
        // bts chongnonsri as default
        latitude:       13.722662,
        longitude:      100.5254523,
        latitudeDelta:  0.01244482511001088,
        longitudeDelta: 0.008046627044677734,
      },
    };
    props.navigator.toggleTabs({
      to:       'hidden',
      animated: false,
    });
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude:       position.coords.latitude,
            longitude:      position.coords.longitude,
            latitudeDelta:  0.01244482511001088,
            longitudeDelta: 0.008046627044677734,
          },
        });
        this.fetchGooglePlace(position.coords);
      }, () => null,
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  }

  onRegionChangeComplete = (region) => {
    this.state.region = region;
    this.onFetchGooglePlace = true;
    this.fetchGooglePlace(region);
  }

  onRegionChange = (region) => {
    this.state.region = region;
    this.refMapAddress.onLoading();
  }

  fetchGooglePlace = (region) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?${Qs.stringify({
      latlng: `${region.latitude}, ${region.longitude}`,
    })}`)
      .then(response => response.json())
      .then((res) => {
        if (res.error_message) {
          this.refMapAddress.setAddress('limit fetch googleplace because no google api key');
        } else {
          this.refMapAddress.setAddress(res.results[0].formatted_address);
        }
        this.onFetchGooglePlace = false;
      }).catch(() => { this.onFetchGooglePlace = false; });
  }

  findNearbyPlaces = () => {
    const { region } = this.state;
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${Qs.stringify({
      location: `${region.latitude}, ${region.longitude}`,
      radius:   100,
    })}`)
      .then(response => response.json())
      .then((res) => {
        this.props.addNearLocation(res.results);
        this.props.navigator.pop();
      }).catch((err) => { console.log('err', err); });
  }

  render() {
    const { region } = this.state;
    return (
      <View style={styles.container}>
        <Map
          mapType="standard"
          provider="google"
          showsUserLocation
          followsUserLocation
          onRegionChangeComplete={this.onRegionChangeComplete}
          onRegionChange={this.onRegionChange}
          showsCompass={false}
          showsPointsOfInterest={false}
          style={styles.map}
          region={region}
          initialRegion={region}
        />

        <MapAddress
          findNearbyPlaces={this.findNearbyPlaces}
          ref={(r) => { this.refMapAddress = r; }}
        />

        <ImageBackground source={selectLocation} style={styles.selectLocation}>
          <TouchableOpacity onPress={this.findNearbyPlaces}>
            <Text style={styles.selectText}>Select Location</Text>
          </TouchableOpacity>
        </ImageBackground>

        <Image source={mapPin} style={styles.pinMapImage} />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position:       'absolute',
    top:            0,
    left:           0,
    right:          0,
    bottom:         0,
    justifyContent: 'flex-end',
    alignItems:     'center',
  },
  map: {
    position: 'absolute',
    top:      0,
    left:     0,
    right:    0,
    bottom:   0,
  },
  pinMapImage: {
    width:    22,
    height:   29.7,
    position: 'absolute',
    left:     (Dimensions.get('window').width / 2) - 15,
    top:      (Dimensions.get('window').height / 2) - 60,
  },
  selectLocation: {
    width:    120,
    height:   37,
    position: 'absolute',
    left:     (Dimensions.get('window').width / 2) - 63,
    top:      (Dimensions.get('window').height / 2) - 100,
  },
  selectText: {
    color:     '#fff',
    textAlign: 'center',
    marginTop: 4,
  },
});
