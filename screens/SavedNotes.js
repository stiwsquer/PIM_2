import React, { useState } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';

export default function SavedNotes({ navigation }) {
  
  const [notes, setNotes] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      readNotes()
    }, [])
  )

  const readNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const notes = await AsyncStorage.multiGet(keys);

      setNotes(notes)
    } catch(e) {
      // Handle error
    }
  }

  return (
    
    <View style={styles.container}>
      <Text>{notes}</Text>
      <Button
        title="DELETE ALL NODES (DEV)"
        onPress={() => AsyncStorage.clear().then(() => readNotes()) }
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
