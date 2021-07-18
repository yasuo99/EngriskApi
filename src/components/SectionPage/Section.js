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
import QuestionSection from './QuestionSection';
import ScriptActions from '../../redux/actions/script';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Section = ({ navigation, routeId, sectionId, scriptId }) => {
    const playbackState = usePlaybackState();
    const [bgColor, setBgColor] = useState(false)

    const [script, setScript] = useState({
        words: [],
        questions: []
    })
    const [words, setWords] = useState([])
    const [questions, setQuestions] = useState([])
    const [wordIndex, setWordIndex] = useState(0)
    const [currentWord, setCurrentWord] = useState({})
    const [questionIndex, setQuestionIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [isFinish, setIsFinish] = useState(false);
    useEffect(() => {
        async function preLoad(){
            const script = await AsyncStorage.getItem('script')
            if(script){
                const parsedScript = JSON.parse(script);
                if(parsedScript.id == scriptId){
                    setScript(parsedScript)
                    if (parsedScript.words.length > 0) {
                        setIsVocabularyScreen(true)
                        setCurrentWord(parsedScript.words[wordIndex])
                    } else {
                        if (parsedScript.questions.length > 0) {
                            setIsQuestionScreen(true)
                            setCurrentWord(parsedScript.questions[questionIndex])
                        }
                    }
                }else{
                    fetchData();
                }
                
            }else{
                await fetchData();
            }
        }
        async function fetchData() {
            const data = await ScriptActions.learn(routeId, sectionId, scriptId);
            console.log('Data nè', data);
            setScript(data.script);
            if (data.script.words.length > 0) {
                setIsVocabularyScreen(true)
                console.log('Tu vung', data.script.words[wordIndex])
                setCurrentWord(data.script.words[wordIndex])
            } else {
                if (data.script.questions.length > 0) {
                    setIsQuestionScreen(true)
                    setCurrentWord(data.script.questions[questionIndex])
                }
            }
            await AsyncStorage.setItem('script',JSON.stringify(data.script));
        }
        preLoad();
    }, [scriptId, sectionId, routeId])
    useEffect(() => {
        setCurrentWord(script.words[wordIndex])
    }, [wordIndex])
    useEffect(() => {
        setCurrentQuestion(script.questions[questionIndex])
    }, [questionIndex])
    const next = () => {
        setBgColor(!bgColor);
    }
    function vocabularyIndexChange() {
        if (wordIndex < script.words.length - 1) {
            setWordIndex(wordIndex + 1)
        } else {
            if (script.questions.length > 0) {
                setIsQuestionScreen(true);
            } else {
                setIsFinish(true);
            }
        }
    }
    useEffect(() => {
        setup();
    }, []);
    const [isVocabularySreen, setIsVocabularyScreen] = useState(false);
    const [isTheoryScreen, setIsTheoryScreen] = useState(false);
    const [isSplashScreen, setIsSplashScreen] = useState(false);
    const [isQuestionScreen, setIsQuestionScreen] = useState(false);
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
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#1DA1F2" }}>Đọc và nghe câu</Text>
                <View style={{ alignItems: "center", backgroundColor: "#1DA1F2", borderRadius: 10 }}>
                    <Image source={require('../../assets/abideby.jpeg')} style={{ width: 420, height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                    <Player
                        onTogglePlayback={togglePlayback}
                    />
                </View>
                {isVocabularySreen &&
                    <ScrollView style={{ height: 320 }}>
                        <Text style={{ fontSize: 32, fontWeight: "bold", marginTop: 20, color: "#fff" }}>{currentWord?.eng}</Text>
                        <Text style={{ fontSize: 24, marginTop: 10, color: "#fff" }}>{currentWord?.vie}</Text>

                    </ScrollView>}


            </View>
            {isVocabularySreen && !isFinish &&
                <View style={styles.view}>
                    <TouchableOpacity onPress={() => vocabularyIndexChange()} style={bgColor === false ? styles.next : styles.nextActive}>
                        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }} >{isFinish ? 'Kết thúc' : 'Tiếp theo'} </Text>
                    </TouchableOpacity>
                </View>}
            {isQuestionScreen && <View style={styles.view}>
                <TouchableOpacity onPress={next} style={bgColor === false ? styles.next : styles.nextActive} onPress={() => setQuestionIndex(questionIndex + 1)}>
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>{isFinish ? 'Kết thúc' : 'Tiếp theo'} </Text>
                </TouchableOpacity>
            </View>}
            {isFinish && <View style={styles.view}>
                <TouchableOpacity onPress={() => navigation.navigate('Lesson', {routeId: routeId, sectionId: sectionId})} style={bgColor === false ? styles.next : styles.nextActive}>
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Kết thúc </Text>
                </TouchableOpacity></View>}
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
    next: {
        width: 420,
        marginTop: 30,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#999",
        borderRadius: 10,
    },
    nextActive: {
        width: 420,
        marginTop: 30,
        padding: 16,
        backgroundColor: "#1DA1F2",
        padding: 16,
        alignItems: "center",
        borderRadius: 10
    },
    view: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 40,
        alignItems: "center",

    }
});

export default Section;
