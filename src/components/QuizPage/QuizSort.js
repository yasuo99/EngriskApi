import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, } from 'react-native';
import { ScrollView } from 'react-native';

const QuizSort = ({ question, isLastQuestion, submitAnswer }) => {
    const [splitted, setSplitted] = useState([])
    const [arrange, setArrange] = useState([])
    useEffect(() => {
        setArrange([])
        if (question.content.trim().includes(" ")) {
            const splittedContent = question.content.trim().split(' ');
            console.log(splittedContent.sort(() => Math.random() - 0.5));
            setSplitted(splittedContent.sort(() => Math.random() - 0.5))
        } else {
            const splittedChar = question.content.trim().split('');
            console.log(splittedChar);
            setSplitted(splittedChar.sort(() => Math.random() - 0.5))
        }

    }, [question])
    useEffect(() => {
        if (isLastQuestion) {
            setArrange([])
            if (question.content.trim().includes(" ")) {
                const splittedContent = question.content.trim().split(' ');
                console.log(splittedContent.sort(() => Math.random() - 0.5));
                setSplitted(splittedContent.sort(() => Math.random() - 0.5))
            } else {
                const splittedChar = question.content.trim().split('');
                console.log(splittedChar);
                setSplitted(splittedChar.sort(() => Math.random() - 0.5))
            }
        }

    }, [isLastQuestion])

    function selectSplit(index) {
        arrange.push(splitted[index])
        setArrange([...arrange])
        splitted.splice(index, 1)
        setSplitted([...splitted])
        if (splitted.length == 0) {
            if (question.content.trim().includes(" ")) {
                const answer = arrange.toString().replace(/,/gi, ' ') //Đáp án sau khi được nối lại
                console.log(answer);
                submitAnswer(answer)
            }
            else {
                const answer = arrange.toString().replace(/,/gi, '') //Đáp án sau khi được nối lại
                submitAnswer(answer)
            }
        }
    }
    function selectArrange(index) {
        setSplitted([...splitted, arrange[index]])
        arrange.splice(index, 1)
        setArrange([...arrange])
    }
    return (
        <View style={styles.screenContainer}>
            <View style={styles.boxQuestion}>
                <Image source={require('../../assets/problem.png')}></Image>
                <View style={styles.question}>
                    <ScrollView>
                        <View style={{ flexDirection: "row", paddingRight: 20 }}>
                            <Text style={styles.textQuestion}>{question.preQuestion.replace(/(<([^>]+)>)/gi, "")}</Text></View>
                    </ScrollView>
                </View>
            </View>
            <View style={{height:250, flexDirection: "row", flexWrap: 'wrap',marginLeft:20,marginRight:20, borderBottomWidth:1, borderColor:"#ededed"}}>
                {arrange.map((arr, idx) =>
                    <TouchableOpacity style={styles.word} key={idx} onPress={() => selectArrange(idx)}>
                        <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>{arr}</Text>
                    </TouchableOpacity>
                )}
            </View>
            < View style={{flex:1, flexDirection: "row", flexWrap: 'wrap',margin:20 }}>
                {splitted.map((split, idx) =>
                    <TouchableOpacity style={styles.word} key={idx} onPress={() => selectSplit(idx)}>
                        <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>{split} </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    word: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        minWidth: 120,
        height: 50,
        borderRadius: 20,
        shadowColor: "#1DA1F2",
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 8,
        margin: 10,
    },
    boxQuestion: {
        margin: 30, 
        flexDirection: "row", 
        height:150,
        borderBottomColor: "#ccc", 
        borderBottomWidth: 1
    },
    question: {
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginLeft: 10,
        padding: 10,
        width: 300,
        height: 80,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    textQuestion: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: "#15202B",
    },
    titleQuestion: {
        fontSize: 38,
        color: "#fff",
        fontWeight: 'bold'
    },
});

export default QuizSort;