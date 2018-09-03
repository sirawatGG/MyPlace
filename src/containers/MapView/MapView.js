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

class MapTest extends Component {
  constructor() {
    super();
    this.onDragMap = false;
    this.state = {
      region: {
        // bts siam as default
        latitude:             13.745752745321662,
        longitude:            100.53365472704174,
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
          showsPointOfInterest={false}
          style={styles.map}
          region={region}
          initialRegion={region}
        >
        </MapView>

        {onFinishChangeRegion &&
          <View style={styles.loDetailDiv}>
            <Text style={styles.loDetailTitle}>Address</Text>
            <Text>{AddressLocation}</Text>
          </View>
        }

        {onFinishChangeRegion &&
          <ImageBackground source={shareLocation} style={styles.shareLocation}>
            <TouchableOpacity>
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
  loDetailDiv: {
    position:        'absolute',
    left:            30,
    top:             13,
    width:           350,
    height:          60,
    backgroundColor: '#fff',
    elevation:       10,
    alignItems:      'center',
    justifyContent:  'center',
  },
  loDetailTitle: {
    fontSize:   15,
    fontWeight: '500',
  },
  loDetailText: {

  },
  pinMapImage: {
    width:    22,
    height:   29.7,
    position: 'absolute',
    left:     (Dimensions.get('window').width / 2) - 11,
    top:      (Dimensions.get('window').height / 2) - 45,
  },
  shareLocation: {
    width:    120,
    height:   37,
    position: 'absolute',
    left:     (Dimensions.get('window').width / 2) - 60,
    top:      (Dimensions.get('window').height / 2) - 60,
  },
  shareText: {
    color:     '#fff',
    textAlign: 'center',
    marginTop: 4,
  },
});
export default MapTest;
