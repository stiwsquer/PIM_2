import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

export default function SavedNotes({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Saved notes</Text>
      <Button
        title="Create note"
        onPress={() => navigation.navigate('CreateNote')}
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
