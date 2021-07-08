import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MenuDrawer from 'react-native-side-drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default class CalenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      open:false,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  toggleOpen = () => {
    this.setState({
      open:!this.state.open
    })
  };
  drawerContent = () => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <FontAwesome
            name="bars"
            color="#ffffff"
            size={32}
            // style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
          />
          <TouchableOpacity style={{flexDirection:"row",marginTop:"40%"}} onPress={()=>{navigation.navigate('Home'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="home"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('ListSection'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="ballot"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Section</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('ListExam'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="rule"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Exam</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('ListFlashCard'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="book"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Flash card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('Message'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="chat"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Tin nhắn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('Calender'),this.setState({open:!this.state.open})}}>
          <MaterialIcons
            name="today"
            size={32}
            color="#ffffff"
            style={{marginLeft:16}}></MaterialIcons>
            <Text style={{fontSize:21,color:"#fff",paddingLeft:16}}>Lịch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginTop:36}} onPress={()=>{navigation.navigate('Notification'),this.setState({open:!this.state.open})}}>
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
  render() {
    const {navigation} = this.props;
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#15202B' barStyle="light-content" />
        <View style={{ flexDirection: "row" }}>
        <MenuDrawer
          open={this.state.open}
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
        </MenuDrawer>
        <TouchableOpacity onPress={this.toggleOpen}>
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
            onDateChange={this.onDateChange}
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
          <View>
            <Text style={{ color: '#fff', marginLeft:16 }}>SELECTED DATE:{startDate}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('CreateReminder')}>
              <Text style={{ color: '#1DA1F2', marginTop: 15, fontSize: 16, marginLeft:16 }}>Thêm nhắc nhở</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202B',
    color: '#fff'
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
  animatedBox: {
    flex: 1,
    backgroundColor: "#192734",
    padding: 10
  },
});