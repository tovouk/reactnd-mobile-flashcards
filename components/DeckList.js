import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, StyleSheet,Button, TouchableOpacity } from 'react-native'
import Deck from './Deck'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator()

class DeckListComponent extends Component {

    state = {
        decklist: {}
    }

    resetList =  async () => {
        await AsyncStorage.clear()
        .then(async ()=>this.setState({decklist:{}}))
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

    onPress = (entry) => {
        this.props.navigation.navigate("Deck List",{screen:'Deck',params:{entry}})
    }

    render() {
        return (
            <View style={styles.container}>

                {this.state.decklist && Object.keys(this.state.decklist).length > 0 ?
                    Object.entries(this.state.decklist).map(entry=>(
                        <TouchableOpacity key={entry[0]} onPress={() => this.onPress(entry)}>
                            <Text style={{padding:16,borderWidth:1,borderColor:'black',borderRadius:16,
                            width:300,alignItems:'center',justifyContent:'center',marginBottom:16, fontSize:40, textAlign:'center'}}>
                            {entry[0]}
                            </Text>
                        </TouchableOpacity>
                    ))
                :
                    <Text style={{fontSize:40}}>No Decks Exist</Text>
                }
                
                <TouchableOpacity
                onPress={this.resetList}>
                <Text style={styles.innerBtn}>Reset List</Text>
                </TouchableOpacity>
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
    },
    innerBtn: {
        color:'blue',
        fontSize: 20
    }
})

export default function DeckList () {
    return <DeckListComponent navigation={useNavigation()}/>;
}