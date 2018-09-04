import React, { Component } from 'react';
import Map from 'react-native-maps';
import Qs from 'qs';

import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import MapAddress from './MapAddress';
const mapPin = require('../../assets/icon_map_pin.png');
const shareLocation = require('../../assets/bg_share_location.png');
export default class MapView extends Component {

  constructor(props) {
    super(props);
    this.refMapAddress = null;
    this.onFetchGooglePlace = false; // to check if it's fetching
    this.state = {
      region: {
        // bts siam as default
        latitude:             13.722662,
        longitude:            100.5254523,
        latitudeDelta:        0.01244482511001088,
        longitudeDelta:       0.008046627044677734,
        onFetchGooglePlace:   true, // to check if it's fetching
        onFinishChangeRegion: false, // to show readable location

        AddressLocation: '',

      },
    };
    props.navigator.toggleTabs({
      to:       'hidden',
      animated: false,
    });
  }
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
        console.log('res', res);
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
