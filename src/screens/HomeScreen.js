import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  Button
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
          <TouchableOpacity style={{flexDirection:"row",marginTop:"40%"}} onPress={()=>navigation.navigate('Home')}>
          <MaterialIcons
            name="home"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>navigation.navigate('ListExam')}>
          <MaterialIcons
            name="ballot"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>navigation.navigate('ListExam')}>
          <MaterialIcons
            name="rule"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Exam</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>navigation.navigate('FlashCard')}>
          <MaterialIcons
            name="book"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Flash card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>navigation.navigate('Message')}>
          <MaterialIcons
            name="chat"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Tin nhắn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>navigation.navigate('Calender')}>
          <MaterialIcons
            name="today"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Lịch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>navigation.navigate('Notification')}>
          <MaterialIcons
            name="notifications"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Thông báo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:"100%"}}>
            <MaterialIcons
            name="logout"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Đăng xuất</Text>
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
        <Image source={require('../assets/icon.png')} style={{ marginTop: 20, marginLeft: 60 }}></Image>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.boxQuiz}>
          <View style={{ flexDirection: "row", marginBottom: 20 }} >
            <View>
              <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>Gợi ý luyện tập</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("ListExam") }}>
              <Text style={{ fontSize: 16, marginLeft: '58%', color: '#fff', paddingTop: 20 }}>Tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            <View style={styles.box}>
              <TouchableOpacity animation="fadeInLeft" onPress={() => navigation.navigate('Quiz')}>
                <Text style={styles.titleQuiz}>Quiz về động vật</Text>
              </TouchableOpacity>
              <Text style={styles.question}>Số câu hỏi: 15</Text>
              <Text style={styles.level}>Độ khó: Easy</Text>
              <Text style={styles.time}>Thời gian làm bài: 15 phút</Text>
            </View>
            <View style={styles.box}>
              <TouchableOpacity animation="fadeInLeft" onPress={() => navigation.navigate('Quiz')}>
                <Text style={styles.titleQuiz}>Quiz về động vật</Text>
              </TouchableOpacity>
              <Text style={styles.question}>Số câu hỏi: 15</Text>
              <Text style={styles.level}>Độ khó: Easy</Text>
              <Text style={styles.time}>Thời gian làm bài: 15 phút</Text>
            </View>
            <View style={styles.box}>
              <TouchableOpacity animation="fadeInLeft" onPress={() => navigation.navigate('Quiz')}>
                <Text style={styles.titleQuiz}>Quiz về động vật</Text>
              </TouchableOpacity>
              <Text style={styles.question}>Số câu hỏi: 15</Text>
              <Text style={styles.level}>Độ khó: Easy</Text>
              <Text style={styles.time}>Thời gian làm bài: 15 phút</Text>
            </View>
            <View style={styles.box}>
              <TouchableOpacity animation="fadeInLeft" onPress={() => navigation.navigate('Quiz')}>
                <Text style={styles.titleQuiz}>Quiz về động vật</Text>
              </TouchableOpacity>
              <Text style={styles.question}>Số câu hỏi: 15</Text>
              <Text style={styles.level}>Độ khó: Easy</Text>
              <Text style={styles.time}>Thời gian làm bài: 15 phút</Text>
            </View>
          </ScrollView>
          <View style={styles.kengang}></View>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.boxWord}>
          <View style={{ flexDirection: "row", marginBottom: 20 }} >
            <View>
              <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>Từ vựng hôm nay</Text>
            </View>
            <View >
              <Text style={{ fontSize: 16, marginLeft: '51%', color: '#fff', paddingTop: 20 }}>Tất cả</Text>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            <View style={styles.box}>
              <TouchableOpacity animation="fadeInLeft" onPress={() => navigation.navigate('FlashCard')}>
                <Text style={styles.word} >Abide by</Text>
              </TouchableOpacity>
              <Text style={styles.spelling}>/əˈbaɪd baɪ/</Text>
              <Image source={require('../assets/abideby.jpeg')} style={{ width: 170, height: 100 }}></Image>
            </View>
            <View style={styles.box}>
              <Text style={styles.word}>Abide by</Text>
              <Text style={styles.spelling}>/əˈbaɪd baɪ/</Text>
              <Image source={require('../assets/abideby.jpeg')} style={{ width: 170, height: 100 }}></Image>
            </View>
            <View style={styles.box}>
              <Text style={styles.word}>Abide by</Text>
              <Text style={styles.spelling}>/əˈbaɪd baɪ/</Text>
              <Image source={require('../assets/abideby.jpeg')} style={{ width: 170, height: 100 }}></Image>
            </View>
            <View style={styles.box}>
              <Text style={styles.word}>Abide by</Text>
              <Text style={styles.spelling}>/əˈbaɪd baɪ/</Text>
              <Image source={require('../assets/abideby.jpeg')} style={{ width: 170, height: 100 }}></Image>
            </View>
          </ScrollView>
          <View style={styles.kengang}></View>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.boxUser}>
          <View style={{ flexDirection: "row", marginBottom: 5 }} >
            <View>
              <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>Top users</Text>
            </View>
            <View >
              <Text style={{ fontSize: 16, marginLeft: '69%', color: '#fff', paddingTop: 20 }}>Tất cả</Text>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            <View style={styles.user}>
              <Image source={require('../assets/avatar.png')} style={styles.image}></Image>
              <Text style={styles.name} onPress={toggleModal}>ThanhLap</Text>
            </View>
            <View style={styles.user}>
              <Image source={require('../assets/avatar.png')} style={styles.image}></Image>
              <Text style={styles.name}>ThanhLap</Text>
            </View>
            <View style={styles.user}>
              <Image source={require('../assets/avatar.png')} style={styles.image}></Image>
              <Text style={styles.name}>ThanhLap</Text>
            </View>
            <View style={styles.user}>
              <Image source={require('../assets/avatar.png')} style={styles.image}></Image>
              <Text style={styles.name}>ThanhLap</Text>
            </View>
            <View style={styles.user}>
              <Image source={require('../assets/avatar.png')} style={styles.image}></Image>
              <Text style={styles.name}>ThanhLap</Text>
            </View>
            <View style={styles.user}>
              <Image source={require('../assets/avatar.png')} style={styles.image}></Image>
              <Text style={styles.name}>ThanhLap</Text>
            </View>
            <View style={styles.user}>
              <Image source={require('../assets/avatar.png')} style={styles.image}></Image>
              <Text style={styles.name}>ThanhLap</Text>
            </View>
            <View style={styles.user}>
              <Image source={require('../assets/avatar.png')} style={styles.image}></Image>
              <Text style={styles.name}>ThanhLap</Text>
            </View>

          </ScrollView>
          <Modal isVisible={isModalVisible} backdropOpacity={0} deviceWidth={100} swipeDirection={'down'} style={styles.view}>
            <View style={styles.modal}>
              <Image source={require('../assets/avatar.png')} style={{width:100,height:100}} ></Image>
              <TouchableOpacity onPress={()=>{setActive(!active)}}>
              {active === false ? 
              <Text style={styles.buttonModal}>Theo dõi</Text> : 
              <Text style={styles.buttonModalActive}>Đang theo dõi</Text>
            }
              </TouchableOpacity>
             
              
              <Text style={{color:"#fff",fontSize:21,fontWeight:"400",marginTop:5}} onPress={toggleModal}>Thanh Lap</Text>
              <Text style={{color:"#fff",fontSize:21,fontWeight:"400",marginTop:5}}>Kinh nghiệm: 100k</Text>
              <Text style={{color:"#fff",fontSize:21,fontWeight:"400",marginTop:5}}>Trình độ: Medium</Text>
              <Text style={{color:"#fff",fontSize:21,fontWeight:"400",marginTop:5}}>Tham gia từ: 2018</Text>
              <Text style={{color:"#fff",fontSize:21,fontWeight:"400",marginTop:5}}>Số bài exam đã làm: 10</Text>
              <Text style={{color:"#fff",fontSize:21,fontWeight:"400",marginTop:5}}>Số từ vựng đã học: 200</Text>
              
            </View>
          </Modal>
        </View>
      </View>

    </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202B'
  },
  boxQuiz: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    height: 330,
    paddingBottom: 20,
  },
  boxWord: {
    marginTop: 70,
    marginLeft: 10,
    paddingBottom: 20,
    height: 330,
  },
  boxUser: {
    marginTop: 110,
    marginLeft: 10,
    paddingBottom: 20,
    height: 200,
  },
  box: {
    flex: 1,
    backgroundColor: '#192734',
    marginRight: 20,
    padding: 20,
    borderRadius: 20,
    width: 210,
    marginBottom: 20,
  },
  user: {
    textAlign: 'center',
    flex: 1,
    width: 120
  },
  image: {
    marginTop: 5,
    width: 70,
    height: 70,
    marginBottom: 5
  },
  titleQuiz: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '400',
    paddingBottom: 20,
    textAlign: 'center'
  },
  name: {
    color: '#fff',
    fontSize: 16,
  },
  question: {
    color: '#8899A6',
    fontSize: 16,
    paddingBottom: 16
  },
  level: {
    color: '#8899A6',
    fontSize: 16,
    paddingBottom: 16
  },
  time: {
    color: '#8899A6',
    fontSize: 16,
    paddingBottom: 16
  },
  word: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    paddingBottom: 16,
    fontWeight: 'bold'
  },
  spelling: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    paddingBottom: 16
  },
  kengang: {
    marginLeft: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: '#f4f4f4',
  },
  modal : {
    marginBottom:65,
    alignItems:"center",
    color:"#fff",
    backgroundColor:"#192734",
    borderRadius:20,
    opacity:0.95,
    padding:20,
    shadowColor: "#1DA1F2",
    shadowOffset: {
        width: 1,
        height: 2,
    },
    shadowOpacity: 0.5,
  },
  buttonModal: {
    borderColor:"#1DA1F2",
    borderWidth:1,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    paddingBottom:10,
    color:"#1DA1F2",
    borderRadius:10,
    marginTop:20,
    fontSize:21
  },
  buttonModalActive : {
    // borderColor:"#1DA1F2",
    // borderWidth:1,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    paddingBottom:10,
    color:"#fff",
    borderRadius:10,
    marginTop:20,
    fontSize:21,
    backgroundColor:"#1DA1F2"
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#192734",
    padding: 10
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
