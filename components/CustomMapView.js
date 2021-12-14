import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function CustomMapView({ location }) {
  return (
    <>
      {location ? (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="this is a marker"
              description="this is a marker example"
            />
          </MapView>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignSelf: 'center',
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height - 600,
    marginTop: 5,
  },
  map: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height - 600,
  },
});
