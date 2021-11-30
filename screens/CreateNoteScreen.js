import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

export default function CreateNoteScreen({ route }) {
  const { item } = route.params;
  return (
    <View>
      <Text>Form goes here</Text>
      <Text>Beer id: {item.id}</Text>
      <Text>Beer name: {item.name}</Text>
    </View>
  );
}
