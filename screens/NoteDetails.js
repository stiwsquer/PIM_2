import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomMapView from '../components/CustomMapView';
import { Button, Icon } from 'react-native-elements';
import Card from '../components/Card';

export default function NoteDetails({ navigation, route }) {
  const removeNote = async () => {
    try {
      await AsyncStorage.removeItem(route.params.beerID);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Card title={route.params.beerName} rating={route.params.beerRating} />

      <Text style={styles.desc}>{route.params.beerDescription}</Text>

      <CustomMapView location={route.params.beerLocation} />

      <View style={styles.buttons}>
        <Button
          icon={<Icon name="delete" size={60} color="#2188DD" />}
          type="clear"
          onPress={() => {
            removeNote();
            navigation.navigate('Saved');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },

  desc: {
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 20,
    color: '#2188DD',
    flex: 1,
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
    bottom: 20,
  },
});
