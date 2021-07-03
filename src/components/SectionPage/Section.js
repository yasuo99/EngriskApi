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
const Section = ({ navigation }) => {
    const playbackState = usePlaybackState();
    const [bgColor, setBgColor] = useState(false)
    const next = () => {
        setBgColor(!bgColor);
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
            <View style={{ margin: 30}}>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#1DA1F2" }}>Đọc và nghe câu</Text>
                <View style={{ alignItems: "center", backgroundColor: "#1DA1F2", borderRadius: 10 }}>
                    <Image source={require('../../assets/abideby.jpeg')} style={{ width: 420, height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                    <Player
                        onTogglePlayback={togglePlayback}
                    />
                </View>
                <ScrollView style={{height:320}}>
                    <Text style={{ fontSize: 32, fontWeight: "bold", marginTop: 20, color: "#fff" }}>What is your name?</Text>
                    <Text style={{ fontSize: 24, marginTop: 10, color: "#fff" }}>Tên bạn là gì?</Text>
                 
                </ScrollView>
               
            </View>
            <View style={styles.view}>
                <TouchableOpacity onPress={next} style={bgColor === false ? styles.next : styles.nextActive}>
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>
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
    view : {
        flex:1,
        justifyContent:"flex-end",
        marginBottom:40,
        alignItems:"center",

    }
});

export default Section;
