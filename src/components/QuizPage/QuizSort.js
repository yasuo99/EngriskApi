import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import Player from "../PlayQuizSort";
import localTrack from "../../assets/pure.m4a";
const QuizSort = () => {
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
                <View style={{ marginLeft: 50, marginRight: 30, flexDirection: "row", height: 60 }}>
                    <Image source={require('../../assets/problem.png')}></Image>
                    <View style={styles.question}>
                        <ScrollView>
                            <View style={{flexDirection:"row",paddingRight:20}}>
                        <Player
                            onTogglePlayback={togglePlayback}
                        />
                        <Text style={styles.textQuestion}>What is your name?</Text></View>
                        </ScrollView>
                    </View>              
                </View>
            </View>
            <View style={styles.kengang}></View>
            <View style={styles.boxAnswer}>
                <View style={styles.line}>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line}>

                </View>
            </View>
            <View style={styles.boxWord}>
                <ScrollView>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.word}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 21, fontWeight: "bold", color: "#15202B" }}>hello</Text>
                        </TouchableOpacity>
                    </View>
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
        flexDirection: "row",
        marginLeft: 60,
        marginRight: 60,
        marginTop: 30,
        marginBottom: 30,

    },
    active: {
        flexDirection: "row",
        marginLeft: 60,
        marginRight: 60,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "#1DA1F2",
        padding: 5,
        borderRadius: 5
    },
    boxAnswer: {
       flex:1
    },
    boxWord: {
        width: 440,
        height: 260,
        marginLeft: 20,
    },
    word: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        width: 90,
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
    line: {
        marginTop: 15,
        width: '90%',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        height: 80,
        marginLeft: 30,
        flexDirection: "row"
    },
    boxQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    question: {
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginLeft: 10,
        width: 280,
        height: 60,
    },
    textQuestion: {
        marginLeft:10,
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
        marginTop: 80,
        marginLeft: 30,
    },
});

export default QuizSort;