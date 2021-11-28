import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Create note"
        onPress={() => navigation.navigate('CreateNote')}
      />
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
    justifyContent: 'space-around',
  },
});
