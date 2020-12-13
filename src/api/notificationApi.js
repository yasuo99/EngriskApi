import axiosClient from "../config/axiosClient"

const notificationApi = {
    getAll: () => {
        const url = "/notifications";
        return axiosClient.get(url);
    },
    getDetail: (id) => {
        const url = `/notifications/${id}`;
        return axiosClient.get(url);
    },
    getPublishing: (params) => {
        const url = `/notifications/publishing`;
        return axiosClient.get(url,{params});
    },
    createNotification: (body) => {
        const url = `/notifications`;
        return axiosClient.post(url,body);
    },
    updateNotify: (id,body) => {
        const url = `/notifications/${id}`;
        return axiosClient.put(url,body);
    },
    deleteNotify:(id) => {
        const url = `/notifications/${id}`;
        return axiosClient.delete(url);
    }
}

export default notificationApi
