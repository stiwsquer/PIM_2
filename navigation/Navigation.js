import React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import SavedNotes from '../screens/SavedNotes';

const { Navigator, Screen } = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} />
        <Screen
          name="CreateNote"
          component={CreateNoteScreen}
          options={{ title: 'Create Note' }}
        />
        <Screen
          name="Saved"
          component={SavedNotes}
          options={{ title: 'Saved notes' }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
