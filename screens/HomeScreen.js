import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import image from '../static/background4.jpg';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>Beer notebook</Text>
        <View style={styles.buttons}>
          <Button
            icon={
              <Icon
                style={{ marginEnd: 5 }}
                name="add"
                size={30}
                color="white"
              />
            }
            onPress={() => navigation.navigate('SelectBeer')}
            title="Create note"
          />
          <Button
            icon={
              <Icon
                style={{ marginEnd: 10 }}
                name="save"
                size={30}
                color="white"
              />
            }
            onPress={() => navigation.navigate('Saved')}
            title="Saved"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 35,
    marginTop: 60,
    flex: 4,
  },
  buttons: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 100,
  },
});
