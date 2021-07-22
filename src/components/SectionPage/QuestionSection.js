import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import Player from "../PlaySection";
import localTrack from "../../assets/pure.m4a";
import Modal from 'react-native-modal';
const QuestionSection = ({ navigation }) => {
    const [bgColor, setBgColor] = useState(false)
    const [bgColorTwo, setBgColorTwo] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleTwo, setModalVisibleTwo] = useState(false);
    const playbackState = usePlaybackState();
    const [bgColorNext, setBgColorNext] = useState(false)
    const next = () => {
        setBgColorNext(!bgColorNext);
    }
    const checkAnswer = () => {
        setBgColor(!bgColor);
        setModalVisible(!isModalVisible)
    }
    const checkAnswerWrong = () => {
        setBgColorTwo(!bgColorTwo);
        setModalVisibleTwo(!isModalVisibleTwo)
    }
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
            <StatusBar barStyle="light-content" />
            <View style={{ margin: 30 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#1DA1F2" }}>Đúng hay sai?</Text>
                <View style={{ alignItems: "center", backgroundColor: "#1DA1F2", borderRadius: 40 }}>
                    <Player
                        onTogglePlayback={togglePlayback}
                    />
                </View>
                <ScrollView style={{ height: 500 }}>
                    <View>
                        <Text style={{ fontSize: 32, fontWeight: "bold", marginTop: 20, color: "#fff" }}>What is your name?</Text>
                        <Text style={{ fontSize: 24, marginTop: 10, color: "#fff" }}>Chúng ta nói điều này khi chúng ta muốn biết tên của người khác</Text>
                    </View>
                    {/* ĐÁP ÁN LẺ */}
                    {/* <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={checkAnswer} style={bgColor === false ? styles.answer : styles.answerCorrect}>
                            <Text style={{ fontSize: 21, color: "#fff" }}>Đúng</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={checkAnswerWrong} style={bgColorTwo === false ? styles.answer : styles.answerWrong}>
                            <Text style={{ fontSize: 21, color: "#fff" }}>Sai</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={checkAnswerWrong} style={bgColorTwo === false ? styles.answer : styles.answerWrong}>
                            <Text style={{ fontSize: 21, color: "#fff" }}>Sai</Text>
                        </TouchableOpacity>
                    </View> */}
                    {/* ĐÁP ÁN CHẴN */}
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={checkAnswer} style={bgColor === false ? styles.answerTwo : styles.answerCorrectTwo}>
                            <Text style={{ fontSize: 21, color: "#fff" }}>Đúng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={checkAnswerWrong} style={bgColorTwo === false ? styles.answerTwo : styles.answerWrongTwo}>
                            <Text style={{ fontSize: 21, color: "#fff" }}>Sai</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Modal onBackdropPress={() => { setModalVisible(false), setBgColor(!bgColor) }} isVisible={isModalVisible} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'}
                style={styles.view}>
                <View style={styles.modal}>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                            name="check-circle"
                            size={32}
                            color="#1DA1F2"
                            style={{ marginLeft: 16 }}></MaterialIcons>
                        <Text style={{ color: "#1DA1F2", fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>Chính xác</Text>
                    </View>
                    <View style={styles.viewNext}>
                        <TouchableOpacity onPress={next} style={bgColorNext === false ? styles.next : styles.nextActive}>
                            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Tiếp theo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
            <Modal onBackdropPress={() => { setModalVisibleTwo(false), setBgColorTwo(!bgColorTwo) }} isVisible={isModalVisibleTwo} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'}
                style={styles.view}>
                <View style={styles.modal}>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                            name="cancel"
                            size={32}
                            color="#E63946"
                            style={{ marginLeft: 16 }}></MaterialIcons>
                        <Text style={{ color: "#E63946", fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>Không chính xác</Text>
                    </View>
                    <View style={styles.viewNext}>
                        <TouchableOpacity onPress={next} style={bgColorNext === false ? styles.next : styles.nextActive}>
                            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Tiếp theo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#15202B',
    },
    buttonExit: {
        marginTop: 8,
        marginLeft: 10,
    },
    exit: {
        flexDirection: 'row',
        borderRadius: 10,
        width: 80,
        height: 40,
        paddingTop: 5,
        paddingLeft: 5,
    },
    textExit: {
        paddingTop: 5,
        fontSize: 16,
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modal: {
        marginBottom: 70,
        color: "#fff",
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    next: {
        width: 420,
        marginTop: 16,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#999",
        borderRadius: 10,
    },
    nextActive: {
        width: 420,
        marginTop: 16,
        padding: 16,
        backgroundColor: "#1DA1F2",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },
    viewNext: {
        justifyContent: "flex-end",
        alignItems: "center",

    },
    // ĐÁP ÁN CHẲN
    answerTwo: {
        width: 180,
        marginLeft: 20,
        marginTop: 30,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#999",
        borderRadius: 10
    },
    // Đáp án đúng
    answerCorrectTwo: {
        width: 180,
        marginLeft: 20,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#1DA1F2",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },
    // Đáp án sai
    answerWrongTwo: {
        width: 180,
        marginLeft: 20,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#E63946",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },

    // ĐÁP ÁN LẺ
    answer: {
        width: 420,
        marginTop: 30,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#999",
        borderRadius: 10
    },
    // Đáp án đúng
    answerCorrect: {
        width: 420,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#1DA1F2",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },
    // Đáp án sai
    answerWrong: {
        width: 420,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#E63946",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    }
});

export default QuestionSection;
