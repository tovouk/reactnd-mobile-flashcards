import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, Text, View } from 'react-native'

export default class Deck extends Component {

    state = {
        title: '',
        info: {}
    }

    componentDidMount(){
        this.getTitle()
    }

    getTitle = async () =>{
        const title = this.props.route.params.entry[0]
        try{
            const decklist = await AsyncStorage.getItem('MobileFlashcards:decklist')
            .then( (decklist)=>{
                this.updateInfo(decklist)
            })
        }catch(error){
            alert(error)
        }
    }

    updateInfo = (info) => {
        this.setState({title:info})
    }
    //TODO remove quotation marks
    render(){
        
        return (
            <View style={{padding:16,borderWidth:1,borderColor:'black',borderRadius:16, width:300,alignItems:'center',justifyContent:'center',marginBottom:16}}>
                {this.props.route.params.entry
                ? <Text style={{fontSize:60}}>{this.props.route.params.entry[0]} Deck - {this.state.title}</Text>
                : <Text>No data</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({})
