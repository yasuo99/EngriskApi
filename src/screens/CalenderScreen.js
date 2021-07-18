import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalenderScreen = ({ navigation }, props) => {
  const [selectedStartDate, setSelectedStartDate] = useState([])
  const [open, setOpen] = useState(false)
  const [reminder, setReminder] = useState([])
  const [dateSelect, setDateSelect] = useState([])
  useEffect(async () => {
    await AsyncStorage.getItem('reminder')
      .then(reminder => {
        let data = JSON.parse(reminder)
        setReminder(data);
        console.log(data)
      });
  }, [setReminder, props])
  const onDateChange = (date) => {
    setDateSelect(date)
    let test = [];
    reminder.map((item, index) => {
      if (item.time.toString().slice(0, 10) == JSON.stringify(date).slice(1, 11)) {
        test.push(item.content)
      }
    })
    setSelectedStartDate(test)
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
  let customDatesStyles = [];
  const dateTime = new Date().toString().slice(8, 10);
  reminder.map((item, index) => {
    if (item.time.toString().slice(8, 10) > dateTime) {
      customDatesStyles.push({
        date: item.time,
        style: { backgroundColor: '#E7453C' },
        textStyle: { color: 'black' },
        containerStyle: [],
        allowDisabled: true,
      });
    }
    else {
      customDatesStyles.push({
        date: item.time,
        style: { backgroundColor: '#D4953D' },
        textStyle: { color: 'black' },
        containerStyle: [],
        allowDisabled: true,
      });
    }
  })
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
      <View style={{ marginTop: 60 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          customDatesStyles={customDatesStyles}
          textStyle={{
            color: '#fff',
          }}
          selectedDayStyle={{
            backgroundColor: '#1DA1F2',
            color: '#fff'
          }}
          monthTitleStyle={{
            fontSize: 42
          }}
          yearTitleStyle={{
            fontSize: 42
          }}
          selectedDayTextColor='#fff'
          todayBackgroundColor="#1DA1F2"
          dayLabelsWrapper={{
            borderBottomColor: '#fff',
            borderTopColor: '#fff'
          }}
        />
        {
          selectedStartDate.length <= 1 ? (
            JSON.stringify(dateSelect).slice(9, 11) < dateTime ?
              <Text style={{ color: '#fff', marginLeft: 16, fontSize: 16 }}>Nội dung nhắc nhở: {selectedStartDate}</Text> :
              <>
              <View style={{ flexDirection: "row", marginTop: 16 }}>
                <Text style={{ flexDirection: "row", marginLeft: 16, color: "#fff", fontSize: 16, width: 400 }}>Nội dung nhắc nhở: {selectedStartDate}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CreateReminder')} style={{ width: 50 }}>
                  <FontAwesome
                    name="edit"
                    color="#ffffff"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('CreateReminder')} style={{ width: 150 }}>
              <Text style={{ color: '#1DA1F2', marginTop: 15, fontSize: 16, marginLeft: 16 }}>Thêm nhắc nhở</Text>
            </TouchableOpacity>
            </>
          ) : (
            JSON.stringify(dateSelect).slice(9, 11) < dateTime ?
              <>
                <Text style={{ color: '#fff', marginLeft: 16, fontSize: 16, marginBottom: 8 }}>Nội dung nhắc nhở:</Text>
                <ScrollView style={{ height: 280 }}>
                  {
                    selectedStartDate.map((item, index) =>
                      <View style={{ flexDirection: "row", marginBottom: 8 }}>
                        <Text style={{ flexDirection: "row", marginLeft: 32, color: "#fff", fontSize: 16, width: 380 }}>{item}</Text>
                      </View>
                    )}
                </ScrollView>
              </> :
              <>
                <Text style={{ color: '#fff', marginLeft: 16, fontSize: 16, marginBottom: 8 }}>Nội dung nhắc nhở:</Text>
                <ScrollView style={{ height: 280 }}>
                  {
                    selectedStartDate.map((item, index) =>

                      <View style={{ flexDirection: "row", marginTop: 8 }}>
                        <Text style={{ flexDirection: "row", marginLeft: 32, color: "#fff", fontSize: 16, width: 380 }}>{item}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CreateReminder')} style={{ width: 50 }}>
                          <FontAwesome
                            name="edit"
                            color="#ffffff"
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  <TouchableOpacity onPress={() => navigation.navigate('CreateReminder')} style={{ width: 150 }}>
                    <Text style={{ color: '#1DA1F2', marginTop: 15, fontSize: 16, marginLeft: 16 }}>Thêm nhắc nhở</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
          )
        }

      </View>

    </View>
  );
}
export default CalenderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202B',
    color: '#fff'
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
  animatedBox: {
    flex: 1,
    backgroundColor: "#192734",
    padding: 10
  },
});