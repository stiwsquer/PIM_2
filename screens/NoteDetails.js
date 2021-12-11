import React from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating-widget';

export default function NoteDetails({ navigation, route }) {

  let note = {
    beerID: route.params.beerID,
    beerName: route.params.beerName,
    beerRating: route.params.beerRating,
    beerDescription: route.params.beerDescription
  }

  const removeNote = async () => {
    try {
      await AsyncStorage.removeItem(route.params.beerID)
    } catch (e) {
      // Handle error
    }
  };

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
        <Text>Lokalizacja</Text>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
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
