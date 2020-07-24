import React, { Component } from 'react'
import { Text, View,StyleSheet,KeyboardAvoidingView, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {getDeckList} from '../utils/api'

export default class AddQuestion extends Component {

    state = {
        question: '',
        answer: ''
    }

    onChangeQuestion = (text) => {
        this.setState({question:text})
    }

    onChangeAnswer = (text) => {
        this.setState({answer:text})
    }

    submitNewQuestion = async () => {
        const question = this.state
        const deckKey = this.props.route.params.deckKey
        try{
            const decklist = await AsyncStorage.getItem('MobileFlashcards:decklist')
            .then( (decklist)=>{
                const decks = JSON.parse(decklist)
                decks[deckKey].questions.push(question)
                AsyncStorage.mergeItem('MobileFlashcards:decklist',JSON.stringify(decks))
                this.setState({question:'',answer:''})
                this.props.navigation.pop()
            })
        }catch(error){
            alert(error)
        }

        // decklist[deckKey].questions.push(question)
        // AsyncStorage.mergeItem('MobileFlashcards:decklist',JSON.stringify(decklist))
        // this.setState({question:'',answer:''})
        // this.props.navigation.pop()
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={{textAlign:'center'}}>Question for the following deck: {this.props.route.params.deckKey}</Text>
                <Text style={styles.title}>What is the question?</Text>
                <TextInput 
                style={styles.input}
                onChangeText={text => this.onChangeQuestion(text)}
                value={this.state.title}
                />
                <Text style={styles.title}>What is the answer?</Text>
                <TextInput 
                style={styles.input}
                onChangeText={text => this.onChangeAnswer(text)}
                value={this.state.title}
                />
                <Button 
                title='Submit'
                onPress={this.submitNewQuestion}
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