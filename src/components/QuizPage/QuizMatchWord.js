import React, {useState} from 'react';
import { StyleSheet, View, Text,} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const QuizMatchWord = () => {
    const [wordActive, setWordActive] = useState(false)
    const [wordActiveRight, setWordActiveRight] = useState(false)
    return (
        <View style={styles.screenContainer}>
           <View style={styles.boxQuestion} >
                <Text style={styles.titleQuestion}>Quiz về động vật</Text>
                <Text style={styles.timeQuestion}>Thời gian còn lại: 00:10:30</Text>
                <Text style={styles.numberQuestion}>Số câu đã chọn: 1/15</Text>
                <ScrollView>
                    <Text style={styles.question}>Nối các từ vựng thành cụm từ có nghĩa</Text>
                </ScrollView>
            </View>
            <View style={styles.kengang}></View>
            <ScrollView>
                <View style={styles.boxAnswer} >
                    <View style={{ flexDirection:"column"}}>
                        <TouchableOpacity onPress={() => {setWordActive(!wordActive)}} style={wordActive === false ? {flexDirection:"row"} : styles.active}>
                            <View style={styles.word}>
                                <Text style={styles.textWord}>Beaver</Text>
                            </View>
                            <FontAwesome
                                name="caret-right"
                                color="#fff"
                                size={48}
                                style={{ marginLeft: -18, marginTop: 22, zIndex:4 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <View style={styles.word}>
                                <Text style={styles.textWord}>pig</Text>
                            </View>
                            <FontAwesome
                                name="caret-right"
                                color="#fff"
                                size={48}
                                style={{ marginLeft: -18, marginTop: 22 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <View style={styles.word}>
                                <Text style={styles.textWord}>wolf</Text>
                            </View>
                            <FontAwesome
                                name="caret-right"
                                color="#fff"
                                size={48}
                                style={{ marginLeft: -18, marginTop: 22 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <View style={styles.word}>
                                <Text style={styles.textWord}>horse</Text>
                            </View>
                            <FontAwesome
                                name="caret-right"
                                color="#fff"
                                size={48}
                                style={{ marginLeft: -18, marginTop: 22 }}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: "column"}}>
                        <TouchableOpacity onPress={() => {setWordActiveRight(!wordActiveRight)}} style={wordActiveRight === false ? {flexDirection:"row"} : styles.activeRight}>
                            <FontAwesome
                                name="caret-right"
                                color={wordActiveRight === false ? "#15202B" : "#fff"}
                                // color="#15202B"
                                size={48}
                                style={{ marginTop: 22, marginLeft: 26,zIndex:2 }}
                            />
                            <View style={styles.wordRight}>
                                <Text style={styles.textWord}>out</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <FontAwesome
                                name="caret-right"
                                color="#15202B"
                                size={48}
                                style={{ marginTop: 22, marginLeft: 26,zIndex:2 }}
                            />
                            <View style={styles.wordRight}>
                                <Text style={styles.textWord}>away</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <FontAwesome
                                name="caret-right"
                                color="#15202B"
                                size={48}
                                style={{ marginTop: 22, marginLeft: 26,zIndex:2 }}
                            />
                            <View style={styles.wordRight}>
                                <Text style={styles.textWord}>around</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <FontAwesome
                                name="caret-right"
                                color="#15202B"
                                size={48}
                                style={{ marginTop: 22, marginLeft: 26,zIndex:2 }}
                            />
                            <View style={styles.wordRight}>
                                <Text style={styles.textWord}>down</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    boxAnswer: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 20,
        marginRight:20
    },
    active :{
        marginLeft:30,
        flexDirection:"row",
    },
    activeRight :{
        marginLeft:-40,
        flexDirection:"row",
    },
    boxQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height: 250,
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
    word: {
        backgroundColor: "#fff",
        width: 180,
        height: 60,
        padding: 10,
        alignItems: "center",
        margin: 16,
    },
    wordRight: {
        backgroundColor: "#fff",
        width: 180,
        height: 60,
        padding: 10,
        alignItems: "center",
        marginLeft: -16,
        marginBottom: 16,
        marginTop: 16,
    },
    textWord: {
        fontSize: 24,
        color: "#15202B",
        fontWeight: "bold"
    },
});

export default QuizMatchWord;