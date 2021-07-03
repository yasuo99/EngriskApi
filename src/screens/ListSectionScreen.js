import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Section from '../components/SectionPage/Section';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Accordion from 'react-native-collapsible/Accordion';
const ListSectionScreen = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    const [activeSections, setActiveSections] = useState([])
    const toggleOpen = () => {
        setOpen(!open);
    };
    const SECTIONS = [
        {
            lesson: 'Bài 1',
            title: 'Xin chào mừng bạn!',
            imageLesson: require('../assets/avatar2.png'),
            expand: "Bắt đầu với trình độ tiếng Anh A1!",
            imageExpand: require('../assets/english.jpg'),
            time: '1 phút'
        },
        {
            lesson: 'Bài 2',
            title: 'Tôi là Thanh Lập',
            imageLesson: require('../assets/avatar.png'),
            expand: "Tên bạn là gì",
            imageExpand: require('../assets/banner1.jpg'),
            time: '2 phút'
        },
        {
            lesson: 'Bài 3',
            title: 'Các bạn có khỏe không?',
            imageLesson: require('../assets/avatar2.png'),
            expand: "Tôi đang cảm thấy rất tuyệt vời, cảm ơn!",
            imageExpand: require('../assets/background4.jpeg'),
            time: '3 phút'
        },
        {
            lesson: 'Bài 4',
            title: 'Hội thoại',
            imageLesson: require('../assets/avatar.png'),
            expand: "Giới thiệu bản thân",
            imageExpand: require('../assets/background4.jpeg'),
            time: '3 phút'
        },

    ];
    //   const _renderSectionTitle = (section) => {
    //     return (
    //       <View style={styles.content}>
    //         <Text>{section.content}</Text>
    //       </View>
    //     );
    //   };

    const _renderHeader = (section) => {
        return (
            <View style={{ flexDirection: "row", width: "90%", marginLeft: 20, marginTop: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ flexDirection: "column" }}>
                    <Image source={section.imageLesson} style={{ width: 70, height: 70, borderRadius: 50 }}></Image>
                </View>
                <View style={{ flexDirection: "column", marginTop: 5, marginLeft: 16, width: "70%" }}>
                    <Text style={{ color: "#ccc", fontSize: 21 }}>{section.lesson}</Text>
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>{section.title}</Text>
                </View>
            </View>
        );
    };

    const _renderContent = (section) => {
        return (
            <LinearGradient
                colors={['rgba(2,33,64,0.4)', 'rgba(30,66,88,0.4)', 'rgba(30,66,88,0.4)']}
                style={styles.linearGradient}>
                <Image source={section.imageExpand} style={styles.image} ></Image>
                <View style={{zIndex:9999, marginTop:-120}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Lesson')}}><Text style={{ marginLeft: 16, fontSize: 21, color: "#fff", fontWeight: "bold" }}>{section.expand}</Text></TouchableOpacity>
                <Text style={{ marginLeft: 16, fontSize: 21, color: "#fff" }}>{section.time}</Text>
                <View style={{ flexDirection: "row", marginLeft:10, marginTop:8 }}>
                    <MaterialIcons
                        name="check-circle"
                        size={32}
                        color="#1DA1F2">
                    </MaterialIcons>
                    <View style={{borderBottomWidth:4,borderColor:"#1DA1F2",width:20, marginBottom:14}}></View>
                    <MaterialIcons
                        name="check-circle"
                        size={32}
                        color="#1DA1F2">    
                    </MaterialIcons>
                    <View style={{borderBottomWidth:4,borderColor:"#1DA1F2",width:20, marginBottom:14}}></View>
                    <MaterialIcons
                        name="check-circle"
                        size={32}
                        color="#1DA1F2">    
                    </MaterialIcons>
                </View>
                </View>
                
            </LinearGradient>

        );
    };

    const _updateSections = (activeSections) => {
        setActiveSections(activeSections)
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
                <Accordion
                    sections={SECTIONS}
                    activeSections={activeSections}
                    // renderSectionTitle={_renderSectionTitle}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    underlayColor={""}
                />
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
    image: {
        width: "100%",
        height: 140,
        zIndex:-1
    },
    linearGradient : {
        zIndex:99,
        width: "90%",
        marginLeft: 20,
        height: 140,
    }
});

export default ListSectionScreen;