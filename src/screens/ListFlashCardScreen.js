import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Accordion from 'react-native-collapsible/Accordion';
const ListFlashCardScreen = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    const [activeSections, setActiveSections] = useState([])
    const toggleOpen = () => {
        setOpen(!open);
    };

    const drawerContent = () => {
        return (
            <TouchableOpacity onPress={toggleOpen} style={styles.animatedBox}>
                <FontAwesome
                    name="bars"
                    color="#ffffff"
                    size={32}
                />
                <TouchableOpacity style={{ flexDirection: "row", marginTop: "40%" }} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons
                        name="home"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => navigation.navigate('ListSection')}>
                    <MaterialIcons
                        name="ballot"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Section</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => navigation.navigate('ListExam')}>
                    <MaterialIcons
                        name="rule"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Exam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => navigation.navigate('FlashCard')}>
                    <MaterialIcons
                        name="book"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Flash card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => navigation.navigate('Message')}>
                    <MaterialIcons
                        name="chat"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Tin nhắn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => navigation.navigate('Calender')}>
                    <MaterialIcons
                        name="today"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Lịch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => navigation.navigate('Notification')}>
                    <MaterialIcons
                        name="notifications"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Thông báo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: "100%" }}>
                    <MaterialIcons
                        name="logout"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Đăng xuất</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.screenContainer}>
            <StatusBar barStyle="light-content" />

            <View style={{ flexDirection: "row" }}>
                <MenuDrawer
                    open={open}
                    drawerContent={drawerContent()}
                    drawerPercentage={45}
                    animationTime={250}
                    overlay={true}
                    opacity={0.4}
                >
                    <TouchableOpacity onPress={toggleOpen}>
                        <FontAwesome
                            name="bars"
                            color="#ffffff"
                            size={32}
                            style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                        />
                    </TouchableOpacity>
                </MenuDrawer>
                <View >
                    <Text style={{ fontWeight: 'bold', fontSize: 42, color: '#ffffff', marginLeft: '40%' }}>ENGRISK</Text>
                </View>
                <View style={styles.buttonExit}>
                    <TouchableOpacity
                        style={styles.exit}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <LinearGradient
                            colors={['#1DA1F2', '#1DA1F2']}
                            style={styles.exit}
                        >
                            <Text style={[styles.textExit, {
                                color: '#fff'
                            }]}>Thoát</Text>
                            <FontAwesome
                                name="sign-out"
                                color="#ffffff"
                                size={32}
                                style={{ marginLeft: 5, }}
                            />
                        </LinearGradient>

                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={{ width: "90%", marginLeft: 20, marginTop: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                    <View style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 10 }}>
                        <Image source={require('../assets/banner.jpg')} style={{ width: "100%", height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                        <TouchableOpacity onPress={()=>{navigation.navigate('FlashCard')}}><Text style={{ color: "#fff", fontSize: 24, marginLeft: 16, marginTop: 8, fontWeight: "bold" }}>Chủ đề: Gia đình</Text></TouchableOpacity>
                        <Text style={{ color: "#ccc", fontSize: 21, marginLeft: 16, marginBottom: 10 }}>10 từ vựng</Text>
                    </View>
                </View>
                <View style={{ width: "90%", marginLeft: 20, marginTop: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                    <View style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 10 }}>
                        <Image source={require('../assets/banner.jpg')} style={{ width: "100%", height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                        <TouchableOpacity onPress={()=>{navigation.navigate('FlashCard')}}><Text style={{ color: "#fff", fontSize: 24, marginLeft: 16, marginTop: 8, fontWeight: "bold" }}>Chủ đề: Gia đình</Text></TouchableOpacity>
                        <Text style={{ color: "#ccc", fontSize: 21, marginLeft: 16, marginBottom: 10 }}>10 từ vựng</Text>
                    </View>
                </View>
                <View style={{ width: "90%", marginLeft: 20, marginTop: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                    <View style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 10 }}>
                        <Image source={require('../assets/banner.jpg')} style={{ width: "100%", height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                        <TouchableOpacity onPress={()=>{navigation.navigate('FlashCard')}}><Text style={{ color: "#fff", fontSize: 24, marginLeft: 16, marginTop: 8, fontWeight: "bold" }}>Chủ đề: Gia đình</Text></TouchableOpacity>
                        <Text style={{ color: "#ccc", fontSize: 21, marginLeft: 16, marginBottom: 10 }}>10 từ vựng</Text>
                    </View>
                </View>
                <View style={{ width: "90%", marginLeft: 20, marginTop: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                    <View style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 10 }}>
                        <Image source={require('../assets/banner.jpg')} style={{ width: "100%", height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                        <TouchableOpacity onPress={()=>{navigation.navigate('FlashCard')}}><Text style={{ color: "#fff", fontSize: 24, marginLeft: 16, marginTop: 8, fontWeight: "bold" }}>Chủ đề: Gia đình</Text></TouchableOpacity>
                        <Text style={{ color: "#ccc", fontSize: 21, marginLeft: 16, marginBottom: 10 }}>10 từ vựng</Text>
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
    buttonExit: {
        marginTop: 8,
        marginLeft: 10
    },
    exit: {
        flexDirection: "row",
        borderRadius: 10,
        width: 80,
        height: 40,
        paddingTop: 5,
        paddingLeft: 5,
    },
    textExit: {
        paddingTop: 5,
        fontSize: 16
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#192734",
        padding: 10
    },

});

export default ListFlashCardScreen;