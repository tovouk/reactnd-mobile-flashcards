import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'


export default class Deck extends Component {

    state = {
        info: {}
    }

    componentDidMount(){
        this.getDeck()
        this._unsubscribe = this.props.navigation.addListener('focus',()=> {
            this.getDeck()
        })
    }

    componentWillUnmount(){
        this._unsubscribe()
    }

    getDeck = async () =>{
        const title = this.props.route.params.entry[0]
        try{
            const decklist = await AsyncStorage.getItem('MobileFlashcards:decklist')
            .then( async (decklist)=>{
                this.updateInfo(JSON.parse(decklist)[title])
            })
        }catch(error){
            alert(error)
        }
    }

    updateInfo = (info) => {
        this.setState({info})
    }

    addCard = () => {
        const deckKey = this.props.route.params.entry[0]
        this.props.navigation.navigate("Deck List",{screen:'AddQuestion',params:{deckKey}})
    }

    takeQuiz = () => {
        const {questions} = this.state.info
        this.props.navigation.navigate("Deck List",{screen:'Quiz',params:{questions}})
    }

    render(){
        
        return (
            <View style={styles.container}>
                {this.props.route.params.entry && this.state.info
                ? 
                <View>
                    <Text style={styles.text}>{this.props.route.params.entry[0]}</Text>
                    <Text style={styles.numCards}>{this.state.info.questions ? this.state.info.questions.length : 'loading'} Cards</Text>
                    <TouchableOpacity onPress={this.addCard}>
                        <Text style={styles.innerBtn}>Add Card</Text>
                    </TouchableOpacity>
                    {this.state.info.questions ?
                    <TouchableOpacity disabled={this.state.info.questions.length === 0} onPress={this.takeQuiz}>
                        <Text style={this.state.info.questions.length === 0 ? styles.disabled : styles.innerBtn}>Take Quiz</Text>
                    </TouchableOpacity> : null
                    }
                </View>
                : <Text style={styles.text}>No data</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding:16,
        borderRadius:16,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:16,
    },
    text: {
        textAlign:'center',
        fontSize:80,
        width: Dimensions.get('window').width
    },
    numCards: {
        fontSize: 24,
        textAlign: 'center'
    },
    innerBtn: {
        fontSize:20,
        textAlign: 'center',
        color: 'blue',
        marginTop: 16,
    },
    disabled: {
        color: 'gray',
        fontSize:20,
        textAlign: 'center',
        marginTop: 16,
    }
})
