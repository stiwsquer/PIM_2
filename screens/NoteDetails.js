import React from 'react';
import { Button, View, Text} from 'react-native';

export default function NoteDetails({ navigation, route }) {
  
  let note = {
    beerID: route.params.beerID,
    beerName: route.params.beerName,
    beerRating: route.params.beerRating,
    beerDescription: route.params.beerDescription
  }

  return (
    <View>
      <Button
        title="DELETE NOTE"
        onPress={() => {}}
      />
      <Text>{route.params.beerName}</Text>
      <Text>{route.params.beerRating}</Text>
      <Text>{route.params.beerDescription}</Text>  
      <Text>Zdjecie</Text>
      <Text>Lokalizacja</Text>  



    </View>
  );
}

