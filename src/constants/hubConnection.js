import { HttpTransportType, LogLevel } from "@microsoft/signalr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import signalr from 'react-native-signalr';
import { Base } from './api';

export const connection = new signalr.hubConnection(`${Base}/notification`, {
    qs: {
        access_token: AsyncStorage.getItem('token'),
    }
})
connection.logging = true;