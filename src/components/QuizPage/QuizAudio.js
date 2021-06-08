import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import Player from "../Play_Progress";
import localTrack from "../../assets/pure.m4a";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';
const QuizAudio = () => {
    const [bgColor, setBgColor] = useState(false)
    const playbackState = usePlaybackState();

    useEffect(() => {
        setup();
    }, []);

    async function setup() {
        await TrackPlayer.setupPlayer({});
        await TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE
            ]
        });
    }

    async function togglePlayback() {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack == null) {
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: "local-track",
                url: localTrack,
            });
            await TrackPlayer.play();
        } else {
            if (playbackState === TrackPlayer.STATE_PAUSED) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }
    return (
        <View style={styles.screenContainer}>
            <View style={styles.boxQuestion} >
                <Text style={styles.titleQuestion}>Quiz về động vật</Text>
                <Text style={styles.timeQuestion}>Thời gian còn lại: 00:10:30</Text>
                <Text style={styles.numberQuestion}>Số câu đã chọn: 1/15</Text>
                <View style={{ marginLeft: 50, marginRight: 30,flexDirection:"row",height:60 }}>
                    <Text style={styles.question}>Câu 2:</Text>
                    <Player
                        style={styles.player}
                        onTogglePlayback={togglePlayback}
                    />
                </View>
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
                            style={{ paddingTop: 8,paddingLeft:5 }}
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
                            style={{ paddingRight:8, paddingTop: 8,paddingLeft:5 }}
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
        </View>
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
        marginBottom: 30,

    },
    active: {
        flexDirection: "row",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor:"#1DA1F2",
        padding:5,
        borderRadius:5
    },
    // Đáp án đúng
    answerCorrect: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 50,
        backgroundColor:"#1DA1F2",
        padding:5,
        borderRadius:5,
        marginTop: 30,
        marginBottom: 30,
    },
    // Đáp án sai
    answerWrong: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 50,
        backgroundColor:"#E63946",
        padding:5,
        borderRadius:5,
        marginTop: 30,
        marginBottom: 30,

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
        marginTop: 40
    },
    question: {
        fontSize: 28,
        color: "#fff",
        marginTop: 25,
        fontWeight: 'bold',
        marginRight:30
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
        marginTop: 80,
        marginLeft: 30,
    },
});

export default QuizAudio;