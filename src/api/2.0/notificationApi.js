import axiosClientv2 from "../../config/axiosClientv2"
const notificationApiV2 = {
    get: async (id, params) => {
        const url = `/notification/${id}`;
        return await axiosClientv2.get(url, {params});
    },
    create: async (notification) => {
        const url = '/notification'
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, notification,{headers});
    },
    seenNotification: async (id, notifyId) => {
        const url = `/notification/${id}/seen/${notifyId}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, {headers});
    }

}
export default notificationApiV2;