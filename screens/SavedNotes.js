import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { Button, Icon } from 'react-native-elements';
import Card from '../components/Card';

export default function SavedNotes({ navigation }) {
  const [notes, setNotes] = useState([]);

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
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={({ minHeight: '100%' }, { width: '100%' })}
        data={notes.reverse()}
        keyExtractor={(item) => item.beerID}
        renderItem={({ item }) => {
          return (
            <View>
              <Card
                title={item.beerName}
                rating={item.beerRating}
                desc={item.beerDescription}
                beerId={item.beerID}
                beerLocation={item.beerLocation}
              />
            </View>
          );
        }}
      />
      <View style={styles.buttons}>
        <Button
          icon={<Icon name="delete" size={60} color="#2188DD" />}
          type="clear"
          onPress={() => {
            Alert.alert(
              'Warning',
              'Are you sure you want to delete all notes?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                },
                {
                  text: 'OK',
                  onPress: () => AsyncStorage.clear().then(() => readNotes()),
                },
              ]
            );
          }}
        />
        <Button
          icon={<Icon name="add" size={60} color="#2188DD" />}
          type="clear"
          onPress={() => navigation.navigate('SelectBeer')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    position: 'relative',
  },
  buttons: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,200,0,0.4)',
    borderRadius: 20,
    margin: 1,
    padding: 10,
    bottom: 5,
  },
});
