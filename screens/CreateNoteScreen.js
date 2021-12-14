import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Input, FAB } from 'react-native-elements';
import StarRating from 'react-native-star-rating-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import CustomMapView from '../components/CustomMapView';

export default function CreateNoteScreen({ route, navigation }) {
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { item } = route.params;

  const saveNote = async () => {
    if (desc === '') {
      Alert.alert('Warning', 'Description cannot be empty!');
    } else if (rating === 0) {
      Alert.alert('Warning', 'Rating cannot be 0!');
    } else {
      try {
        let note = {
          beerID: item.id,
          beerName: item.name,
          beerRating: rating,
          beerDescription: desc,
          beerLocation: location,
        };
        await AsyncStorage.setItem(item.id, JSON.stringify(note));
        navigation.navigate('Saved');
      } catch (e) {
        console.error(e);
      }
    }
  };

  useLayoutEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        timeOut: 10000,
        maximumAge: 60,
      });
      console.log(location);
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.beerName}>{item.name}</Text>
      <Text style={styles.rateText}>Rate your beer</Text>
      <StarRating
        style={styles.rating}
        rating={rating}
        starSize={50}
        enableSwiping={true}
        onChange={setRating}
      />
      <Input
        style={styles.input}
        placeholder="Add your description"
        multiline={true}
        maxLength={200}
        blurOnSubmit={true}
        keyboardType="default"
        returnKeyType="done"
        value={desc}
        onChangeText={(desc) => setDesc(desc)}
      />
      {errorMsg ? (
        <Text style={{ fontSize: 20, textAlign: 'center' }}>{errorMsg}</Text>
      ) : null}
      <CustomMapView location={location} />
      <FAB
        style={styles.submitButton}
        icon={{ name: 'done', color: 'white' }}
        onPress={() => saveNote()}
        color="#2188DD"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  beerName: {
    textAlign: 'center',
    fontSize: 52,
    margin: 10,
    color: '#2188DD',
  },
  rateText: {
    fontSize: 32,
    color: '#2188DD',
    marginVertical: 10,
  },
  rating: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 20,
  },
  input: {
    minHeight: 20,
    maxHeight: 100,
    paddingTop: 20,
  },
  submitButton: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
