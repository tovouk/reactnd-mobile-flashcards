import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'

const Tab = createBottomTabNavigator();

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
