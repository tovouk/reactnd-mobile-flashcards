import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class DeckList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Deck List </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    }
})