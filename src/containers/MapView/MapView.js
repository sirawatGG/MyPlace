import React, { Component } from 'react';
import MapView from 'react-native-maps';
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

const mapPin = require('../../assets/icon_map_pin.png');
const shareLocation = require('../../assets/bg_share_location.png');
export default class MapView extends Component {

  constructor() {
    super();
    this.onDragMap = false;
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
  }

  onRegionChangeComplete = (region) => {
    if (this.onDragMap) {
      this.state.region = region;
      this.setState({ onFinishChangeRegion: true, onFetchGooglePlace: true });
      this.onDragMap = false;
      this.onFetchGooglePlace(region);
    }
  }

  onRegionChange = (region) => {
    this.onDragMap = true;
    this.state.region = region;
    if (this.state.onFinishChangeRegion === true) {
      this.setState({ onFinishChangeRegion: false });
    }
  }

  onFetchGooglePlace = (region) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?${Qs.stringify({
      latlng:   `${region.latitude}, ${region.longitude}`,
      language: 'th',
    })}`)
      .then(response => response.json())
      .then((responseJson) => {
        console.log('responseJson', responseJson);
        this.setState({
          onFetchGooglePlace: false,
          AddressLocation:    responseJson.results[0].formatted_address,
        });
      }).catch(() => { this.state.onFetchGooglePlace = false; });
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
    const { region, AddressLocation, onFinishChangeRegion } = this.state;
    return (
      <View style={styles.container}>
        <MapView
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
        >
        </MapView>

        {onFinishChangeRegion &&
          <View style={styles.loDetailDiv}>
            <Text style={styles.loDetailTitle}>Address</Text>
            <Text style={styles.loDetailText}>{AddressLocation}</Text>
          </View>
        }
        <MapAddress
          findNearbyPlaces={this.findNearbyPlaces}
          ref={(r) => { this.refMapAddress = r; }}
        />

        {onFinishChangeRegion &&
          <ImageBackground source={shareLocation} style={styles.shareLocation}>
            <TouchableOpacity onPress={this.findNearbyPlaces}>
              <Text style={styles.shareText}>Share Location</Text>
            </TouchableOpacity>
          </ImageBackground>
        }

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
