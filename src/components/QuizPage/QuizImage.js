import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const QuizImage = () => {
    const [bgColor, setBgColor] = useState(false)
    return (
        <View style={styles.screenContainer}>
            <View style={styles.boxQuestion} >
                <Text style={styles.titleQuestion}>Quiz về động vật</Text>
                <Text style={styles.timeQuestion}>Thời gian còn lại: 00:10:30</Text>
                <Text style={styles.numberQuestion}>Số câu đã chọn: 1/15</Text>
                <ScrollView>
                <Text style={styles.question}>What id the meaning of "dog" ?</Text>
                </ScrollView>
            </View>
            <View style={styles.kengang}></View>
            <View style={styles.boxAnswer} >
                <ScrollView>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => { setBgColor(!bgColor) }} style={bgColor === false ? styles.answer : styles.active}>
                        <Image source={require('../../assets/Image2.png')} style={{width:70,height:70}}></Image>
                        <Text style={styles.contentAnswer}>Mèo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.answer}>
                        <Image source={require('../../assets/Image2.png')} style={{width:70,height:70}}></Image>
                        <Text style={styles.contentAnswer}>Mèo</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.answer}>
                        <Image source={require('../../assets/Image2.png')} style={{width:70,height:70}}></Image>
                        <Text style={styles.contentAnswer}>Mèo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.answer}>
                        <Image source={require('../../assets/Image2.png')} style={{width:70,height:70}}></Image>
                        <Text style={styles.contentAnswer}>Mèo</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    answer: {
        alignItems:"center",
        marginLeft: 35,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "#fff",
        width:180,
        height:150,
        borderRadius:10,
        paddingTop:20
    },
    // Đáp án được chọn
    active: {
        alignItems:"center",
        marginLeft: 35,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        width:180,
        height:150,
        borderRadius:10,
        paddingTop:20,
        backgroundColor: "#1DA1F2",
    },
     // Đáp án đúng
    answerCorrect: {
        alignItems:"center",
        marginLeft: 35,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        width:180,
        height:150,
        borderRadius:10,
        paddingTop:20,
        backgroundColor: "#1DA1F2",
    },
    // Đáp án sai
    answerWrong: {
        alignItems:"center",
        marginLeft: 35,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        width:180,
        height:150,
        borderRadius:10,
        paddingTop:20,
        backgroundColor: "#E63946",
    },
    boxAnswer: {
        flex:1
    },
    contentAnswer: {
        marginTop: 10,
        fontSize: 28,
        color: "#fff",
        fontWeight: 'bold',
        color:'#15202B'
    },
    boxQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height:250
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
        fontWeight: 'bold'
    },
    kengang: {
        width: '90%',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        marginLeft: 30,
    },
});

export default QuizImage;