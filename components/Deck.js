import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, Text, View } from 'react-native'

export default class Deck extends Component {

    state = {
        title: ''
    }

    componentDidMount(){
        this.getTitle()
    }

    getTitle = async () =>{
        const title = this.props
        try{
            const decklist = await AsyncStorage.getItem('MobileFlashcards:decklist')
            .then( (decklist)=>{
                if(decklist){
                    this.setState({title:decklist[title]})
                }
            })
        }catch(error){
            alert(error)
        }
    }
    //TODO remove quotation marks
    render(){
        return (
            <View style={{padding:16,borderWidth:1,borderColor:'black',borderRadius:16, width:'99%',alignItems:'center',justifyContent:'center',marginBottom:16}}>
                <Text style={{fontSize:60}}>{JSON.stringify(this.props.title)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
