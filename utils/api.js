import { AsyncStorage } from '@react-native-community/async-storage'

const DECK_STORAGE_KEY = 'mobile-flashcards:decklist'
//not sure if needed yet
//TODO continue looking at https://react-native-community.github.io/async-storage/docs/api to decide best approach
const QUESTION_STORAGE_KEY = 'mobile-flashcards:questions'


export function getDeckList(){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function submitDeck ({key, name}){
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        key: {
            title: [key],
            questions: []
        }
    }))
}

export function removeDeck (key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}