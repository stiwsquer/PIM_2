import React from 'react';
import { Button, Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating-widget';
import MapView, {Marker} from 'react-native-maps';

export default function NoteDetails({ navigation, route }) {

  let note = {
    beerID: route.params.beerID,
    beerName: route.params.beerName,
    beerRating: route.params.beerRating,
    beerDescription: route.params.beerDescription,
    beerLocation: route.params.beerLocation
  }

  const removeNote = async () => {
    try {
      await AsyncStorage.removeItem(route.params.beerID)
    } catch (e) {
      // Handle error
    }
  };

  let latitude = 0;
  let longitude = 0;
  let text;
  if (route.params.beerLocation) {
    console.log(route.params.beerLocation);
    text = JSON.stringify(route.params.beerLocation);
    latitude = route.params.beerLocation.coords.latitude;
    longitude = route.params.beerLocation.coords.longitude;
  } else {
    
    console.log("nie ma lokacji");
  }
  return (
    <View>
      <Button
        title="DELETE NOTE"
        onPress={() => {
          removeNote();
          navigation.navigate('Saved');
        }}
      />
      <View style={styles.main}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg',
          }}
        />
        <View style={styles.inner}>
          <Text style={styles.title}>{route.params.beerName}</Text>
          <StarRating
          style={styles.rating}
          rating={route.params.beerRating}
          enableSwiping="false"
          disabled="true"
          onChange={() => { }}
          />
        </View>
      </View>
      <View>
        <Text style={styles.desc}>{route.params.beerDescription}</Text>
      </View>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>Lokalizacja</Text>
      <View style={styles.container2}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
             <Marker
          coordinate={{latitude: latitude, longitude: longitude}}
          title="this is a marker"
          description="this is a marker example"
        />
          </MapView>
        
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container2: {
    alignSelf: 'center',
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height - 600,
  },
  map: {
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height - 600,
  },
  rating: {
    marginLeft: 25,
    marginTop: 35,
    alignSelf: 'flex-start'
  },
  image: {
    width: 125,
    height: 150,
    margin: 10,
    resizeMode: 'stretch',
  },
  title: {
    margin: 5,
    fontSize: 32,
    alignSelf: 'center',
  },
  desc: {
    fontSize: 22,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  main: {
    flexDirection: 'row',
    borderBottomWidth: 2,
  },
  inner: {
    flexDirection: 'column',
    flex: 1,
  },
});
