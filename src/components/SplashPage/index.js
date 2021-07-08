import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { loggedIn } = useSelector(state => state.auth)
    const performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }
    useEffect(async () => {
        try {
            const data = await performTimeConsumingTask();
            if (data) {
                if (!loggedIn) {
                    navigation.navigate('SignIn')
                } else {
                    navigation.navigate('Tab')
                }
            }
        } catch (error) {
            console.log(error);
        }


    })
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#15202B' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../assets/flask.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
                <Text style={styles.title}>ENGRISK</Text>
            </View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15202B',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#f2f2f2',
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 50,
    }
});