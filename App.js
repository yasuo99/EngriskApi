import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import ChatScreen from './src/screens/ChatScreen';
import MessageScreen from './src/screens/MessageScreen';
import CalenderScreen from './src/screens/CalenderScreen';
import SignUpPage from './src/components/SignUpPage';
import SignInPage from './src/components/SignInPage';
import SplashPage from './src/components/SplashPage';
import ForgotPasswordPage from './src/components/ForgotPasswordPage';
import ChangePasswordPage from './src/components/ChangePasswordPage';
import FlashCardScreen from './src/screens/FlashCardScreen';
import QuizScreen from './src/screens/QuizScreen';
import SectionScreen from './src/screens/SectionScreen';
import QuestionSection from './src/components/SectionPage/QuestionSection';
import ListExamScreen from './src/screens/ListExamScreen';
import ResultScreen from './src/screens/ResultScreen';
import CreateReminderScreen from './src/screens/CreateReminderScreen';
import CreateGroupScreen from './src/screens/CreateGroupScreen';
import CreateGroupScreenTwo from './src/screens/CreateGroupScreenTwo';
import CreateMemberScreen from './src/screens/CreateMemberScreen';
import ListSectionScreen from './src/screens/ListSectionScreen';
import ListFlashCardScreen from './src/screens/ListFlashCardScreen';
import Lesson from './src/components/SectionPage/Lesson';
//Redux
import 'localstorage-polyfill';
import { Provider, useSelector } from 'react-redux';
import configureStore from './src/redux/store';

const Tab = createBottomTabNavigator();
const store = configureStore();
import { createStackNavigator } from '@react-navigation/stack';
const HomeStack = createStackNavigator();
import {
  Image
} from 'react-native';
const logo = require('./src/assets/avatar.png');
function TabScreen(){
  // getTabBarVisibility = route => {
  //   const routeName = route.state
  //     ? route.state.routes[route.state.index].name
  //     : '';

  //   if (routeName === 'SignIn' || routeName === 'SignUp') {
  //     return false;
  //   }
  //   return true;
  // };
  return(
    <Tab.Navigator
    tabBarOptions={{
      inactiveBackgroundColor: '#15202B',
      activeTintColor: '#1DA1F2',
      inactiveTintColor: '#B0B3B8',
      activeBackgroundColor: '#15202B',
      showLabel: false,
    }}>

    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={() => ({
        tabBarLabel: 'Trang chủ',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="home" size={32} color={color} />
        ),
      })}
    >

    </Tab.Screen>
    <Tab.Screen
      name="Calender"
      component={CalenderScreen}
      options={{
        tabBarLabel: 'Lịch',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="today" size={32} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Cá nhân',
        tabBarIcon: ({ color }) => (
          <Image
            style={{ marginTop: -20 }}
            source={logo} />
        ),
      }}
    />
    <Tab.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        tabBarLabel: 'Thông báo',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="notifications" size={32} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Message"
      component={MessageScreen}
      options={{
        // tabBarLabel: 'Tin nhắn',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="chat" size={32} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
  )
}
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
      <HomeStack.Screen name="Calender" component={CalenderScreen} />
      <HomeStack.Screen name="Chat" component={ChatScreen} />
      <HomeStack.Screen name="Message" component={MessageScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
      {/* <HomeStack.Screen name="SignUp" component={SignUpPage} />
      <HomeStack.Screen name="SignIn" component={SignInPage} /> */}
      {/* <HomeStack.Screen name="Splash" component={SplashPage} />   */}
      <HomeStack.Screen name="FlashCard" component={FlashCardScreen} />
      <HomeStack.Screen name="CreateReminder" component={CreateReminderScreen} />
      <HomeStack.Screen name="CreateGroup" component={CreateGroupScreen} />
      <HomeStack.Screen name="CreateGroupTwo" component={CreateGroupScreenTwo} />
      <HomeStack.Screen name="CreateMember" component={CreateMemberScreen} />
      <HomeStack.Screen name="Quiz" component={QuizScreen} />
      <HomeStack.Screen name="Lesson" component={Lesson} />
      <HomeStack.Screen name="Section" component={SectionScreen} />
      <HomeStack.Screen name="ListSection" component={ListSectionScreen} />
      <HomeStack.Screen name="QuestionSection" component={QuestionSection} />
      <HomeStack.Screen name="ListFlashCard" component={ListFlashCardScreen} />
      <HomeStack.Screen name="ListExam" component={ListExamScreen} />
      <HomeStack.Screen name="Result" component={ResultScreen} />
    </HomeStack.Navigator>
  );
}
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
               <HomeStack.Screen name="Splash" component={SplashPage} />
              <HomeStack.Screen name="SignIn" component={SignInPage} />
              <HomeStack.Screen name="SignUp" component={SignUpPage} />
              <HomeStack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
              <HomeStack.Screen name="ChangePassword" component={ChangePasswordPage} />
              <HomeStack.Screen name="Tab" component={TabScreen} />
            </HomeStack.Navigator>
      </NavigationContainer>
    </Provider>

  );
};
export default App;
