import React, { Component } from 'react'
import { Text, View, StyleSheet,Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {clearLocalNotification,setLocalNotification} from '../utils/helpers'

export default class Quiz extends Component {

    state = {
        correct: 0,
        questions: [],
        currentQuestion: 0,
        showAnswer: false,
        complete: false
    }

    componentDidMount(){
        this.setState({questions:this.props.route.params.questions})
    }

    toggleAnswer = () => {
        this.setState((prevState)=> (
            {showAnswer:!prevState.showAnswer}
        ))
    }

    increaseCorrect = () =>{
        this.setState((prevState)=> (
            {correct:prevState.correct + 1}
        ))
        this.nextIndex()
    }

    nextIndex = () => {
        const questionLength = this.state.questions.length
        this.setState((prevState)=> {
            if(prevState.currentQuestion === questionLength - 1){
                return {complete: true}
            }
            return {currentQuestion:prevState.currentQuestion+1}
        })
    }

    resetQuiz = () => {
        this.setState({
            correct: 0,
            currentQuestion: 0,
            showAnswer: false,
            complete: false
        })
    }

    backToDeck = () => {
        clearLocalNotification()
        setLocalNotification()
        this.props.navigation.pop()
    }

    render() {
        return (
            <View style={styles.container}>
                { this.state.questions.length > 0
                    ? this.state.complete
                        ? <View>
                            <Text style={styles.question}>{this.state.correct}/{this.state.questions.length} Correct</Text>
                            <TouchableOpacity onPress={this.resetQuiz}>
                                <Text  style={styles.btn}>Restart Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.backToDeck}>
                                <Text  style={styles.btn}>Back To Deck</Text>
                            </TouchableOpacity>
                        </View>
                        : <View>
                            <Text>Question {this.state.currentQuestion + 1} / {this.state.questions.length}</Text>
                            <Text style={styles.question}>
                            { this.state.showAnswer
                                ? this.state.questions[this.state.currentQuestion].answer
                                : this.state.questions[this.state.currentQuestion].question
                            }
                            </Text>
                            <TouchableOpacity onPress={this.toggleAnswer}>
                                <Text style={styles.btn}>Show {this.state.showAnswer? 'Question' : 'Answer'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.increaseCorrect}>
                                <Text  style={styles.btn}>CORRECT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.nextIndex}>
                                <Text  style={styles.btn}>WRONG</Text>
                            </TouchableOpacity>
                        </View>
                    : <Text style={styles.question}>Loading Questions...or is it?</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        width: Dimensions.get('window').width,
        fontSize: 60,
        textAlign:'center'
    },
    btn: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 20,
        marginBottom: 16
    }
})