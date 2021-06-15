import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Quiz from '../components/QuizPage/Quiz';
import QuizAudio from '../components/QuizPage/QuizAudio'
import QuizImage from '../components/QuizPage/QuizImage'
import QuizMatchWord from '../components/QuizPage/QuizMatchWord'
import QuizSort from '../components/QuizPage/QuizSort'
import QuizConversation from '../components/QuizPage/QuizConversation'
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const QuizScreen = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [open, setOpen] = useState(false)
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
                // style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                />
                <TouchableOpacity style={{ flexDirection: "row", marginTop: "40%" }} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons
                        name="home"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => navigation.navigate('ListExam')}>
                    <MaterialIcons
                        name="ballot"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Quiz</Text>
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
                    <Text style={{ fontWeight: 'bold', fontSize: 42, color: '#ffffff', marginLeft: '40%' }}>ENGRISH</Text>
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
            <QuizMatchWord></QuizMatchWord>
            <View style={styles.changeQuestion}>
                <TouchableOpacity>
                    <FontAwesome
                        name="chevron-left"
                        color="#ffffff"
                        size={24}
                        style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                    />
                </TouchableOpacity>
                <View style={{ width: 420, alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold", marginTop: 8 }} onPress={toggleModal}>Câu 1/10</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Result')}>
                    <FontAwesome
                        name="chevron-right"
                        color="#ffffff"
                        size={24}
                        style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                    />
                </TouchableOpacity>
            </View>
            <Modal isVisible={isModalVisible} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'} style={styles.view}>
                <View style={styles.modal}>
                    <View style={styles.headerModal}>
                        <TouchableOpacity>
                            <FontAwesome
                                name="chevron-left"
                                color="#ffffff"
                                size={24}
                                style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                            />
                        </TouchableOpacity>
                        <View style={{ width: 420, alignItems: "center" }}>
                            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold", marginTop: 8 }} onPress={toggleModal}>Câu 1/10</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Result')}>
                            <FontAwesome
                                name="chevron-right"
                                color="#ffffff"
                                size={24}
                                style={{ marginLeft: 10, marginTop: 10, paddingTop: 5, paddingRight: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumberActive}>
                                <Text style={styles.titleNumberActive}>1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumberActive}>
                                <Text style={styles.titleNumberActive}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumber}>
                                <Text style={styles.titleNumber}>3</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumber}>
                                <Text style={styles.titleNumber}>4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumber}>
                                <Text style={styles.titleNumber}>5</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumber}>
                                <Text style={styles.titleNumber}>6</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumber}>
                                <Text style={styles.titleNumber}>7</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumber}>
                                <Text style={styles.titleNumber}>8</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumber}>
                                <Text style={styles.titleNumber}>9</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <View style={styles.boxNumber}>
                                <Text style={styles.titleNumber}>10</Text>
                            </View>
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
        backgroundColor: '#15202B'
    },
    changeQuestion: {
        flexDirection: "row",
        backgroundColor: "#1DA1F2",
        height: 60
    },
    headerModal: {
        flexDirection: "row",
        backgroundColor: "#1DA1F2",
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
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
    modal: {
        marginBottom: 50,
        justifyContent: "flex-end",
        alignItems: "center",
        color: "#fff",
        backgroundColor: "#192734",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowColor: "#1DA1F2",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        paddingBottom: 20,
    },
    boxNumber: {
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingTop: 10,
        width: 60,
        height: 60
    },
    boxNumberActive: {
        backgroundColor: "#1DA1F2",
        borderRadius: 50,
        paddingTop: 10,
        width: 60,
        height: 60
    },
    titleNumber: {
        color: "#15202B",
        fontSize: 28,
        textAlign: "center",
        fontWeight: 'bold'
    },
    titleNumberActive: {
        color: "#fff",
        fontSize: 28,
        textAlign: "center",
        fontWeight: 'bold'
    },
    box: {
        width: 100,
        alignItems: 'center'
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

export default QuizScreen;