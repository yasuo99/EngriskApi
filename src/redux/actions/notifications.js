import axiosClient from "../../utils/axiosClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const NotificationActionsTypes = {
    GET_ALL: "GET_ALL",
}
Object.keys(NotificationActionsTypes).forEach((key) => {
    NotificationActionsTypes[key] = `NOTIFICATION_${NotificationActionsTypes[key]}`
});
//Biến id hiện sẽ được set cứng tuy nhiên sau đó sẽ chuyển qua lấy từ AsyncStorage
const getAll = async (id) => {
    const url = `/notification/${id}`
    const params = {
        pageSize: 50,
    }
    const data = await axiosClient.get(url,{params})
    await AsyncStorage.setItem('notification',JSON.stringify(data.items));
    return {
        type: NotificationActions.GET_ALL,
        data: data
    }
}
const NotificationActions = {
    getData: getAll
}
export default NotificationActions
