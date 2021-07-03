import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
const Lesson = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false)
  const [active, setActive] = useState(false)
  const checkActive = () => {
    setActive(!active)
  }
  const slides = [
    {
      lesson: 'Bài 1',
      title: 'Xin chào mừng bạn!',
      expand: 'Bắt đầu với trình độ tiếng Anh A1!',
      image: require('./../../assets/banner1.jpg'),
      content: 'Từ vựng',
      description: 'Học các từ và cụm từ mới'
    },
    {
      lesson: 'Bài 1',
      title: 'Xin chào mừng bạn!',
      expand: 'Bắt đầu với trình độ tiếng Anh A1!',
      image: require('./../../assets/banner1.jpg'),
      content: 'Hội thoại',
      description: 'Đọc và nghe các từ theo ngữ cảnh'
    },
  ];
  const _renderItem = ({ item }) => {
    return (
      <LinearGradient
        colors={['rgba(2,33,64,0.2)', 'rgba(30,66,88,0.2)', 'rgba(30,66,88,0.2)']}
        style={styles.linearGradient}>
        <Image source={item.image} style={styles.slide} ></Image>
        <View style={{marginTop:"-180%"}}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => { navigation.navigate('ListSection') }}>
              <MaterialIcons
                name="arrow-back"
                size={32}
                color="#333"
                style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
              </MaterialIcons>
            </TouchableOpacity>
            <Text style={styles.title}>{item.lesson} - {item.title}</Text>
          </View>
          <Text style={styles.expand}>{item.expand}</Text>
          <View style={{ marginTop: "50%", alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Section') }} style={styles.buttonActive} ><Text style={{ fontSize: 21, color: "#fff" }}>Bắt đầu</Text></TouchableOpacity>
          </View>
          {/* <Text style={styles.text}>{item.text}</Text> */}
          </View>
      </LinearGradient>
    );
  }
  const _onDone = () => {
    setShowRealApp(true)
  }
  return (
    <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} />
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#15202B',
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginTop: 20
  },
  expand: {
    fontSize: 24,
    color: "#fff",
    marginTop: 5,
    marginLeft: 50
  },
  slide: {
    width: "100%",
    height: "100%",
    zIndex:-1
  },
  content: {
    fontSize: 38,
    color: "#1DA1F2",
    fontWeight: "bold"
  },
  description: {
    fontSize: 28,
    color: "#fff",
  },
  button: {
    marginTop: 16,
    borderRadius: 30,
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "#fff"
  },
  buttonActive: {
    marginTop: 16,
    borderRadius: 30,
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "#1DA1F2",
    backgroundColor: "#1DA1F2"
  },
  // image: {
  //   flex: 1,
  //   resizeMode: "cover",
  //   justifyContent: "center",
  //   zIndex:-1
  // },
  linearGradient : {
    zIndex:99,
    width: "100%",
    height: "100%",

  }
});

export default Lesson;
