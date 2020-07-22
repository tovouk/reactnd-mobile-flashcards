import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, StyleSheet,Button, FlatList } from 'react-native'
import Deck from './Deck'
import { useNavigation } from '@react-navigation/native';

class DeckListComponent extends Component {

    state = {
        decklist: {}
    }
    //TODO make ui update
    resetList =  async () => {
        await AsyncStorage.clear()
        .then(async ()=>this.forceUpdate())
    }
    //This is more of a hacky way to do it, I am opting not to use redux for this, although redux would make it easier
    componentDidMount(){
        this.getList()
        this._unsubscribe = this.props.navigation.addListener('focus',()=> {
            this.getList()
        })
    }

    componentWillUnmount(){
        this._unsubscribe()
    }

    getList = async () => {
        try{
            const decklist = await AsyncStorage.getItem('MobileFlashcards:decklist')
            .then( async (decklist)=>{
                if(decklist){
                    this.setState({decklist:JSON.parse(decklist)})
                }
                //alert(this.state.decklist)
            })
        }catch(e){
            alert('cannot retrieve list')
        }
    }

    renderDeck = (entry) => (
        <Deck key={entry.item} title={entry.item[0]} />
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={Object.entries(this.state.decklist)}
                    renderItem={this.renderDeck}
                    keyExtractor={item => item.title}
                />
                <Button
                title='reset list'
                onPress={this.resetList}
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
        marginBottom: 40
    }
})

export default function DeckList () {
    return <DeckListComponent navigation={useNavigation()}/>;
}