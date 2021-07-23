import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'react-native-elements'
import NotificationActions from './../../redux/actions/notifications';
const logo = require('./../../assets/avatar.png');
const UserBottom = ({color}) => {
    const [notifications, setNotifications] = useState([])
    useEffect(async () => {
        try {
            const data = await NotificationActions.getData(1)
            setNotifications(data.data.items.length);
          } catch (error) {
            console.log(error);
          }
  
    }, [setNotifications])
    return (
     <View>
          <Image
            style={{ marginTop: -20 }}
            source={logo} />
          
     </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex:1
    }
});

export default UserBottom;