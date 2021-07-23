import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
const QuizInput = () => {
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);
    const UselessTextInput = (props) => {
        return (
          <TextInput
            {...props}
            editable
            maxLength={40}
          />
        );
      }
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    const _keyboardDidShow = () => setKeyboardStatus("Keyboard Shown");
    const _keyboardDidHide = () => setKeyboardStatus("Keyboard Hidden");
    return (
        <View style={styles.screenContainer}>
            <View style={styles.boxQuestion}>
                <Text style={styles.question}>What is your name? What is your name? What is your name? What is your name? </Text>
            </View>
            <View style={styles.kengang}></View>
            <Text style={{fontSize:24,color:"#fff", marginLeft:30, marginTop:20}}>ĐÁP ÁN:</Text>
            <TextInput
                style={styles.input}
                placeholder='Nhập câu trả lời...'
                onSubmitEditing={Keyboard.dismiss}
            />
            {/* <Text style={styles.status}>{keyboardStatus}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },

    boxQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 20
    },
    question: {
        fontSize: 28,
        color: "#fff",
    },
    textQuestion: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: "#15202B",
        padding: 5,
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
    kengang: {
        width: '90%',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        marginTop: 40,
        marginLeft: 30,
    },
    input: {
        margin:30,
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor:"#fff",
        height:60,
        backgroundColor:"#fff",
        fontSize:21,
        color:"#333"
      },
      status: {
        padding: 10,
        textAlign: "center"
      }
});

export default QuizInput;