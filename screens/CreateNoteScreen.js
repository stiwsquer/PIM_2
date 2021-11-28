import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

export default function CreateNoteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Create note screen</Text>
      <Button
        title="Go to saved notes"
        onPress={() => navigation.navigate('Saved')}
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
