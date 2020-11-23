import axiosClient from '../config/axiosClient';
const quizApi = {
    getAll: (params) => {
        const url = "/quizzes";
        return axiosClient.get(url,{params});
    },
    getDetail: (id) => {
        const url = `/quizzes/${id}`;
        return axiosClient.get(url);
    },
    create: (body) => {
        const url = "/quizzes"
        return axiosClient.post(url,body)
    },
    update: (id,body) => {
        const url = `/quizzes/${id}`;
        return axiosClient.put(url,body);
    },
    delete: (id, body) => {
        const url = `/quizzes/${id}`;
        return axiosClient.delete(url, body);
    }
}
export default quizApi;