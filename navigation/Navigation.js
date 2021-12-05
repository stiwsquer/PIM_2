import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import SavedNotes from '../screens/SavedNotes';
import { navigationRef } from './RootNavigation';
import SelectBeerScreen from '../screens/SelectBeerScreen';
import NoteDetails from '../screens/NoteDetails';

const { Navigator, Screen } = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} />
        <Screen
          name="SelectBeer"
          component={SelectBeerScreen}
          options={{ title: 'Select beer' }}
        />
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
        <Screen
          name="Details"
          component={NoteDetails}
          options={{ title: 'Details of note' }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
