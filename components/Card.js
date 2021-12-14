import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { navigate } from '../navigation/RootNavigation';

export default function Card({ title, rating, desc, beerId, beerLocation }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigate('Details', {
          beerID: beerId,
          beerName: title,
          beerRating: rating,
          beerDescription: desc,
          beerLocation: beerLocation,
        })
      }
    >
      <View style={styles.box}>
        <Text style={styles.title}>{title}</Text>
        <StarRating
          style={styles.rating}
          rating={rating}
          enableSwiping="false"
          disabled
          onChange={() => {}}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // maxHeight: 180,
    // minHeight: 150,
    margin: 5,
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
    flexDirection: 'row',
  },

  rating: {
    marginBottom: 20,
    alignSelf: 'center',
    flex: 1,
  },
  title: {
    color: '#2188DD',
    flex: 1,
    margin: 20,
    fontSize: 24,
  },
  box: {
    minHeight: 150,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
