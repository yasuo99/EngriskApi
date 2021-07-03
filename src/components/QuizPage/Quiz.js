import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Quiz = () => {
    const [bgColor, setBgColor] = useState(false)
    return (
        <ScrollView style={styles.screenContainer}>
            <View style={styles.boxQuestion} >
                <Text style={styles.titleQuestion}>Quiz về động vật</Text>
                <Text style={styles.timeQuestion}>Thời gian còn lại: 00:10:30</Text>
                <Text style={styles.numberQuestion}>Số câu đã chọn: 1/15</Text>
                <Text style={styles.question}>What id the meaning of "dog" ?</Text>
                
            </View>
            <View style={styles.kengang}></View>
            <View style={styles.boxAnswer} >
                <ScrollView>
                <TouchableOpacity onPress={() => {setBgColor(!bgColor)}} style={bgColor === false ? styles.answer : styles.active}>
   
                        <View style={styles.boxNumber}>
                            <Text style={styles.titleNumber}>A</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Mèo</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerCorrect}>
                        <FontAwesome
                            name="check"
                            color="#ffffff"
                            size={32}
                            style={{ paddingTop: 8 }}
                        />
                        <View style={styles.boxNumber}>
                            <Text style={styles.titleNumber}>B</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Chó</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerWrong}>
                        <FontAwesome
                            name="close"
                            color="#ffffff"
                            size={32}
                            style={{ paddingRight:5, paddingTop: 8 }}
                        />
                        <View style={styles.boxNumber}>
                            <Text style={styles.titleNumber}>C</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Vịt</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answer}>
                        <View style={styles.boxNumber}>
                            <Text style={styles.titleNumber}>D</Text>
                        </View>
                        <View>
                            <Text style={styles.contentAnswer}>Bò</Text>
                        </View>
                </TouchableOpacity>
                
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    answer: {
        flexDirection: "row",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        marginBottom: 10,
        padding:8,
    },
    active: {
        flexDirection: "row",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        marginBottom: 10,
        backgroundColor:"#1DA1F2",
        padding:5,
        borderRadius:5
    },
    // Đáp án đúng
    answerCorrect: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 50,
        backgroundColor:"#1DA1F2",
        padding:5,
        borderRadius:5,
        marginTop: 30,
        marginBottom: 10,
    },
    // Đáp án sai
    answerWrong: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 50,
        backgroundColor:"#E63946",
        padding:5,
        borderRadius:5,
        marginTop: 30,
        marginBottom: 10,

    },
    boxAnswer: {
        flex:1
    },
    boxNumber: {
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingTop: 6,
        paddingLeft: 10,
        width: 50,
        height: 50,
        marginLeft:8
    },
    titleNumber: {
        color: "#15202B",
        fontSize: 28,
        marginLeft: 6,
        fontWeight: 'bold'
    },
    contentAnswer: {
        marginLeft: 16,
        marginTop: 10,
        fontSize: 24,
        color: "#fff",
        fontWeight: 'bold'
    },
    boxQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    titleQuestion: {
        fontSize: 38,
        color: "#fff",
        fontWeight: 'bold'
    },
    timeQuestion: {
        fontSize: 18,
        color: "#fff",
        marginTop: 5
    },
    numberQuestion: {
        fontSize: 18,
        color: "#fff",
        marginTop: 5
    },
    question: {
        fontSize: 28,
        color: "#fff",
        margin: 20,
        fontWeight: 'bold',
    },
    kengang: {
        width: '90%',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        marginLeft: 30,
    },
});

export default Quiz;