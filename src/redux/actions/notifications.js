import axiosClient from "../../utils/axiosClient";

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
    const notifications = await axiosClient.get(url,{params})
    console.log(notifications);
    return {
        type: NotificationActions.GET_ALL,
        data: notifications.items
    }
}
const NotificationActions = {
    getData: getAll
}
export default NotificationActions
