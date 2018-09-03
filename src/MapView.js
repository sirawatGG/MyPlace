import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { View, StyleSheet, Text } from 'react-native'
class MapTest extends Component {
  render () {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude:       13.745752745321662,
            longitude:      100.53365472704174,
            latitudeDelta:  0.01244482511001088,
            longitudeDelta: 0.008046627044677734,
          }}
        ></MapView>
        <Text>Gun</Text>
      </View>
    )   
  }
}
console.log('StyleSheet.absoluteFillObject', StyleSheet.absoluteFillObject);
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default MapTest