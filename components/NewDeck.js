import React, { Component } from 'react'
import { Text, View, StyleSheet, Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default class NewDeck extends Component {
    state = {
        value: ''
    }

    onChangeText = (text) => {
        this.setState({value:text})
    }

    submitNewDeck = () => {
        const {value} = this.state

        //Update DeckList with new Deck

        this.setState({value:''})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>What is the name of this deck?</Text>
                <TextInput 
                style={styles.input}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.value}
                />
                <Button 
                title='Submit'
                onPress={this.submitNewDeck}
                accessibilityLabel='Submit New Deck'
                />
            </View>
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