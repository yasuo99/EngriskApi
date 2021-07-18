import axiosClient from "../../utils/axiosClient"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const BoxChatActionsTypes = {
    GET_ALL: 'GET_ALL',
    GET_DETAIL: 'GET_DETAIL',
}
Object.keys(BoxChatActionsTypes).forEach((key) => {
    BoxChatActionsTypes[key] = `BOXCHAT_${BoxChatActionsTypes[key]}`
})
//Biến id tạm thời set cứng, sau đó cũng sử dụng AsyncStorage
//Token cũng đc lấy từ AsyncStorage
const getAll = async (id) => {
    const url = `/accounts/${id}/boxchats`
    const headers = {
        Authorization: `Bearer {token}`
    }
    const data = await axiosClient.get(url);
    await AsyncStorage.setItem('boxchats',JSON.stringify(data));
    return {
        type: BoxChatActionsTypes.GET_ALL,
        data: data
    }
}
//userId là id của người dùng lấy từ AsyncStorage
//boxchatId là từ params
const getDetail = async (userId, boxchatId) => {
    const url = `/accounts/${userId}/boxchats/${boxchatId}`
    const headers = {
        Authorization: `Bearer {token}`
    }
    const data = await axiosClient.get(url)
    return {
        type: BoxChatActionsTypes.GET_ALL,
        data: data
    }
}
const BoxChatActions = {
    getAll: getAll,
    getDetail: getDetail
}
export default BoxChatActions