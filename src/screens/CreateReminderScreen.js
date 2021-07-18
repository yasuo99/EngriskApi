import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker'
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const logo = require('../../assets/world.png');
import { notification } from '../components/NotificationPage/Notification'

const CreateReminderScreen = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(
        {
            title: '',
            content: '',
            time: new Date(),
            checkTitle: false,
            checkContent: false,
            checkTime: false,
    });
    const [check, setCheck] = useState(
        {
            checkTitle: false,
            checkContent: false,
            checkTime: false,
    });
    const handleTitle = (val) => {
        setData({
            ...data,
            title: val,
            
        });
        setCheck({
            checkTitle: true
        })
    }
    const handleContent = (val) => {
        setData({
            ...data,
            content: val,
           
        });
        setCheck({
            checkContent: true
        })
    }
    const handleTime = (val) => {
        setData({
            ...data,
            time: val,
        });
        setCheck({
            checkTime: true
        })
    }
    function createReminder() {
        notification.configure();
        notification.buatChannel(1);
        notification.kirimNotifikasiJadwal(1, "Thông báo nhắc nhở", data.time, data.content);
        // console.log(reminder)
        // await AsyncStorage.setItem('reminders', JSON.stringify(data))
        AsyncStorage.getItem('reminder')
          .then(reminder => {
            if(reminder !== null){
                const test = JSON.parse(reminder)
                test.push(data)
                AsyncStorage.setItem('reminder', JSON.stringify(test))
                console.log(reminder);
            }
            else{
                const test = [];
                test.push(data)
                AsyncStorage.setItem('reminder', JSON.stringify(test))
                console.log(reminder);
            }
          })
        // AsyncStorage.getItem('reminder')
        // .then(reminder => {
        //     console.log(reminder)
        // })
        setData({
            title: '',
            content: '',
            time: new Date(),
            
        })
        setCheck({
            checkTitle: false,
            checkContent: false,
            checkTime: false,
        })
    }
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
                <TouchableOpacity style={{ flexDirection: "row", marginTop: "40%" }} onPress={() => { navigation.navigate('Home'), setOpen(!open) }}>
                    <MaterialIcons
                        name="home"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('ListSection'), setOpen(!open) }}>
                    <MaterialIcons
                        name="ballot"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Section</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('ListExam'), setOpen(!open) }}>
                    <MaterialIcons
                        name="rule"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Exam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('ListFlashCard'), setOpen(!open) }}>
                    <MaterialIcons
                        name="book"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Flash card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('Message'), setOpen(!open) }}>
                    <MaterialIcons
                        name="chat"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Tin nhắn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('Calender'), setOpen(!open) }}>
                    <MaterialIcons
                        name="today"
                        size={32}
                        color="#ffffff"
                        style={{ marginLeft: 16 }}></MaterialIcons>
                    <Text style={{ fontSize: 21, color: "#fff", paddingLeft: 16 }}>Lịch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", marginTop: 36 }} onPress={() => { navigation.navigate('Notification'), setOpen(!open) }}>
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
        <View style={styles.container}>
            <StatusBar backgroundColor='#15202B' barStyle="light-content" />
            <View style={{ flexDirection: "row" }}>
                <MenuDrawer
                    open={open}
                    drawerContent={drawerContent()}
                    drawerPercentage={45}
                    animationTime={250}
                    overlay={true}
                    opacity={0.4}
                >

                </MenuDrawer>
                <TouchableOpacity onPress={toggleOpen}>
                    <FontAwesome
                        name="bars"
                        color="#ffffff"
                        size={32}
                        style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
                    />
                </TouchableOpacity>
                <View >
                    <Text style={{ fontWeight: 'bold', fontSize: 42, color: '#ffffff', marginLeft: '35%' }}>ENGRISK</Text>
                </View>
                <View style={styles.buttonExit}>
                    <TouchableOpacity
                        style={styles.exit}
                        onPress={() => navigation.navigate('Calender')}
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
            <View
                style={styles.content}
            >
                <Text style={styles.text_titleScreen}>Thêm nhắc nhở</Text>
                <Text style={styles.text_title}>Tiêu đề <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
                </Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Tiêu đề"
                        placeholderTextColor="#1DA1F2"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleTitle(val)}
                        value={data.title}
                    />
                </View>
                <Text style={styles.text_content}>Nội dung <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
                </Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Nội dung"
                        placeholderTextColor="#1DA1F2"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleContent(val)}
                        value={data.content}
                    />
                </View>
                <Text style={styles.text_time}>Thời gian <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
                </Text>

                <View style={styles.boxDate}>
                    <DatePicker
                        date={data.time}
                        onDateChange={(val) => handleTime(val)}
                        mode="datetime"
                        style={{ width: 400, marginTop: 10, height: 120, backgroundColor: "#fff" }}
                        androidVariant="nativeAndroid"
                    />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.create}
                        onPress={createReminder}
                    >
                        <LinearGradient
                            colors={['#1DA1F2', '#1DA1F2']}
                            style={styles.create}
                        >
                            <Text style={[styles.textCreate, {
                                color: '#fff'
                            }]}>Thêm nhắc nhở</Text>
                        </LinearGradient>

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CreateReminderScreen;

const styles = StyleSheet.create({
    logo: {
        marginTop: '8%',
        marginLeft: '32%',
    },
    container: {
        flex: 1,
        backgroundColor: '#15202B'
    },
    header: {
        // flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
        height: 100,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 180,
        marginLeft: 20,
        marginRight: 20,
    },
    content: {
        flex: 1,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
    },
    footer: {
        flex: 2,
        backgroundColor: '#15202B',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 48,
        marginLeft: '28%',
        marginTop: 10,
    },
    text_titleScreen: {
        color: '#1DA1F2',
        fontSize: 38,
        fontWeight: 'bold',
        paddingBottom: 20,
        marginTop: 30
    },
    text_content: {
        color: '#f2f2f2',
        fontSize: 16,
    },
    text_title: {
        color: '#f2f2f2',
        fontSize: 16,
    },
    text_time: {
        color: '#f2f2f2',
        fontSize: 16,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        paddingTop: 12,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        borderRadius: 5,
        fontSize: 14

    },
    actionError: {
        flexDirection: 'row',
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#f2f2f2',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        paddingBottom: 5,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    create: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textCreate: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#192734",
        padding: 10
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
});
