import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import AddQuestion from './components/AddQuestion'
import Quiz from './components/Quiz'
import QuizComplete from './components/QuizComplete'
import {setLocalNotification,clearLocalNotification} from './utils/helpers'
import * as Notifications from 'expo-notifications'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Decks">
      <Stack.Screen name="Decks" component={DeckList} />
      <Stack.Screen name="Deck" component={Deck} options={{
        transitionSpec: {
          open: {
            animation: 'spring',
            config: {
              stiffness: 1000,
              damping: 500,
              mass: 3,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            },
          },
          close: {
            animation: 'spring',
            config: {
              stiffness: 500,
              damping: 500,
              mass: 3,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            },
          }
        }
      }}/>
      <Stack.Screen name="AddQuestion" component={AddQuestion} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="QuizComplete" component={QuizComplete} />
    </Stack.Navigator>
  )
}

export default class App extends Component{
  
  async componentDidMount(){
    await setLocalNotification()
  }

  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Deck List">
          <Tab.Screen name="Deck List" component={HomeStack} />
          <Tab.Screen name="New Deck" component={NewDeck} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}
