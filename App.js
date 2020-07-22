import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
//TODO fix dependency issue on iOS related to this https://github.com/th3rdwave/react-native-safe-area-context/issues/110

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Decks">
      <Stack.Screen name="Decks" component={DeckList} />
      <Stack.Screen name="Deck" component={Deck} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Deck List">
        <Tab.Screen name="Deck List" component={HomeStack} />
        <Tab.Screen name="New Deck" component={NewDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
