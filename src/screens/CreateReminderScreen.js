import React from 'react';
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
const logo = require('../../assets/world.png');

const CreateReminderScreen = ({ navigation }) => {
    const [date, setDate] = React.useState(new Date());
    const [data, setData] = React.useState({
        title: '',
        content: '',
        time: '',
        beforeTime: '',
    });

    const handleTitle = (val) => {
        setData({
            ...data,
            title: val,
        });
    }
    const handleContent = (val) => {
        setData({
            ...data,
            content: val,
        });
    }
    const handleTime = (val) => {
        setData({
            ...data,
            time: val,
        });
    }
    const handleBeforeTime = (val) => {
        setData({
            ...data,
            beforeTime: val,
        });
    }
    return (
        <View style={styles.container}>
        <StatusBar backgroundColor='#15202B' barStyle="light-content" />
        <View style={{ flexDirection: "row" }}>
          <View animation="fadeInLeft">
            <FontAwesome
              name="bars"
              color="#ffffff"
              size={32}
              style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
            />
          </View>
          <View >
            <Text style={{ fontWeight: 'bold', fontSize: 42, color: '#ffffff', marginLeft: '34%' }}>ENGRISH</Text>
          </View>
          <Image source={require('../assets/icon.png')} style={{ marginTop: 20, marginLeft: 60 }}></Image>
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
                    />
                </View>
                <Text style={styles.text_time}>Thời gian <Text style={{ color: '#FF0000', fontSize: 18 }}>*</Text>
                </Text>

                <View style={styles.boxDate}>
                    <DatePicker
                        date={date}
                        onDateChange={setDate}
                        mode="time"
                        style={{width:400, marginTop:10,height:120,backgroundColor:"#fff"}}
                        androidVariant="nativeAndroid"
                    />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.create}
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
        marginTop:30
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
    }
});
