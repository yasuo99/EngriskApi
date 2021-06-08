import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, FlatList, Text, Image,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const NotificationItem = ({item}) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemTopContainer}>
      <View>
        <Image source={require('../assets/avatar.png')} style={{width:60,height:60}}></Image>
      </View>
      <View style={styles.itemTopTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
    </View>
    <View>
      <Text style={styles.itemDetail}>{item.detail}</Text>
    </View>
    <View style={styles.kengang}></View>
  </View>
);

const NotificationScreen = ({navigation}) => {
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
        <Text style={{marginTop:20,marginBottom:20, color:'#fff', fontSize:36, fontWeight:'bold', marginLeft:10}}>THÔNG BÁO</Text>
      <View style={styles.bodyContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={[
              {
                id: 1,
                type: 1,
                name: 'Anker Giảm Khủng 40% Duy Nhất Hôm Nay 13/11',
                date: '13/11/2018',
                detail:
                  'Anker Giảm Khủng 40% Duy Nhất Hôm Nay 13/11 - Số Lượng Có Hạn',
              },
              {
                id: 2,
                type: 2,
                name: 'Gợi ý quà tặng',
                date: '02/11/2018',
                detail:
                  'NHẬP MÃ UUDAIT11 GIẢM 50K CHO ĐƠN HÀNG 700K. Áp dụng cho sản phẩm ngành Điện Gia Dụng. XEM NGAY!',
              },
              {
                id: 3,
                type: 1,
                name: 'Anker Giảm Khủng 40% Duy Nhất Hôm Nay 13/11',
                date: '13/11/2018',
                detail:
                  'Anker Giảm Khủng 40% Duy Nhất Hôm Nay 13/11 - Số Lượng Có Hạn',
              },
              {
                id: 4,
                type: 2,
                name: 'Gợi ý quà tặng',
                date: '02/11/2018',
                detail:
                  'NHẬP MÃ UUDAIT11 GIẢM 50K CHO ĐƠN HÀNG 700K. Áp dụng cho sản phẩm ngành Điện Gia Dụng. XEM NGAY!',
              },
              {
                id: 5,
                type: 1,
                name: 'Anker Giảm Khủng 40% Duy Nhất Hôm Nay 13/11',
                date: '13/11/2018',
                detail:
                  'Anker Giảm Khủng 40% Duy Nhất Hôm Nay 13/11 - Số Lượng Có Hạn',
              },
              {
                id: 6,
                type: 2,
                name: 'Gợi ý quà tặng',
                date: '02/11/2018',
                detail:
                  'NHẬP MÃ UUDAIT11 GIẢM 50K CHO ĐƠN HÀNG 700K. Áp dụng cho sản phẩm ngành Điện Gia Dụng. XEM NGAY!',
              },
              {
                id: 7,
                type: 1,
                name: 'Anker Giảm Khủng 40% Duy Nhất Hôm Nay 13/11',
                date: '13/11/2018',
                detail:
                  'Anker Giảm Khủng 40% Duy Nhất Hôm Nay 13/11 - Số Lượng Có Hạn',
              },
              {
                id: 8,
                type: 2,
                name: 'Gợi ý quà tặng',
                date: '02/11/2018',
                detail:
                  'NHẬP MÃ UUDAIT11 GIẢM 50K CHO ĐƠN HÀNG 700K. Áp dụng cho sản phẩm ngành Điện Gia Dụng. XEM NGAY!',
              },
            ]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <NotificationItem item={item} />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#15202B'
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {  
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  itemTopContainer: {
    flexDirection: 'row',
  },
  itemTypeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTopTextContainer: {
    marginRight: 40,
    marginLeft: 8,
  },
  itemName: {
    color: '#fff',
    fontWeight: '400',
    fontSize:18,
  },
  itemDate: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 8,
  },
  itemDetail: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 12,
  },
  buttonExit : {
    marginTop:8,
    marginLeft:10
  },
  exit: {
    flexDirection: "row",
    borderRadius: 10,
    width: 80,
    height: 40,
    paddingTop:5,
    paddingLeft:5,
  },
  textExit : {
    paddingTop:5,
    fontSize:16
  },
  kengang : {
    width:'100%',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    marginTop:20
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#192734",
    padding: 10
  },
});

export default NotificationScreen;