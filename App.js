import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'

const Tab = createBottomTabNavigator();

//TODO fix dependency issue on iOS related to this https://github.com/th3rdwave/react-native-safe-area-context/issues/110

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Deck List">
        <Tab.Screen name="Deck List" component={DeckList} />
        <Tab.Screen name="New Deck" component={NewDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
