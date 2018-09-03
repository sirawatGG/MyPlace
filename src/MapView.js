import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
class MapTest extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Gun</Text>
      </View>
    )   
  }
}
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