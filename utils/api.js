import AsyncStorage from '@react-native-community/async-storage'

const DECK_STORAGE_KEY = 'MobileFlashcards:decklist'
const QUESTION_STORAGE_KEY = 'MobileFlashcards:questions'


export const getDeckList = async () =>{
    return await AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => JSON.parse(results))
}

export const submitDeck = async({key,value}) => {
    
}

export async function removeDeck (key) {
    const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
}

export const clearDeck = async () => {
    try {
        return await AsyncStorage.removeItem(DECK_STORAGE_KEY)
    } catch (error) {
        alert('error clearing data')
    }
}