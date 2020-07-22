import React, { Component } from 'react'
import { Text, View, StyleSheet, Button,KeyboardAvoidingView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native';

class NewDeckComponent extends Component {
    state = {
        title: ''
    }

    onChangeText = (text) => {
        this.setState({title:text})
    }

    submitNewDeck = async () => {
        try{
            const {title} = this.state
        const value = {
            title,
            questions: []
        }
        const currentDeckList = AsyncStorage.getItem('MobileFlashcards:decklist')
        .then( (results) => {
            let newDeckList = Object.assign({},JSON.parse(results))
            //alert(JSON.stringify(newDeckList))
            if(JSON.stringify(newDeckList) === null){
                newDeckList = {
                    key:value
                }
            }else{
                newDeckList[[title]] = value
            }
            //alert("final step " + JSON.stringify(newDeckList))
            //Update DeckList with new Deck
            AsyncStorage.mergeItem('MobileFlashcards:decklist',JSON.stringify(newDeckList))

            this.setState({title:''})
            this.props.navigation.navigate('Deck List')
        })
        
        }catch(error){
            alert(error)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.title}>What is the name of this deck?</Text>
                <TextInput 
                style={styles.input}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.title}
                />
                <Button 
                title='Submit'
                onPress={this.submitNewDeck}
                accessibilityLabel='Submit New Deck'
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        margin: 'auto',
        textAlign: 'center'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 16,
        width: '90%'
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16

    }
})

export default function NewDeck (){
    return (
        <NewDeckComponent navigation={useNavigation()} />
    )
}