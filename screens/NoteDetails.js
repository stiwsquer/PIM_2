import React from 'react';
import { Button, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    } catch(e) {
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
      <Text>{route.params.beerName}</Text>
      <Text>{route.params.beerRating}</Text>
      <Text>{route.params.beerDescription}</Text>  
      <Text>Zdjecie</Text>
      <Text>Lokalizacja</Text>  

    </View>
  );
}

