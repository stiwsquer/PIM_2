import React, { useState } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import StarRating from 'react-native-star-rating-widget';

export default function SavedNotes({ navigation }) {
  const [notes, setNotes] = useState([]);

  const Card = (props) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Details', {
            beerID: props.beerId,
            beerName: props.title,
            beerRating: props.rating,
            beerDescription: props.desc,
          })
        }
      >
        <View>
          <Image
            style={styles.image}
            source={{
              uri: 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg',
            }}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>{props.title}</Text>
          <StarRating
            style={styles.rating}
            rating={props.rating}
            enableSwiping="false"
            disabled="true"
            onChange={() => {}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      readNotes();
    }, [])
  );

  const readNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const notes = await AsyncStorage.multiGet(keys);
      const notesList = notes.map((elem) => JSON.parse(elem[1]));
      setNotes(notesList);
    } catch (e) {
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={({ height: '100%' }, { width: '100%' })}
        data={notes.reverse()}
        keyExtractor={(item) => item.beerID}
        renderItem={({ item }) => {
          return (
            <View>
              <Card
                style={styles.card}
                title={item.beerName}
                rating={item.beerRating}
                desc={item.beerDescription}
                beerId={item.beerID}
              />
            </View>
          );
        }}
      />
      <Button
        title="DELETE ALL NODES (DEV)"
        onPress={() => AsyncStorage.clear().then(() => readNotes())}
      />
      <Button
        title="Create note"
        onPress={() => navigation.navigate('SelectBeer')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  card: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 2,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  image: {
    width: 125,
    height: 150,
    margin: 10,
    resizeMode: 'stretch',
  },
  rating: {
    marginRight: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
    flex: 3,
  },
  title: {
    flex: 2,
    margin: 30,
    fontSize: 24,
  },
  box: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
