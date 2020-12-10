import axiosClient from '../config/axiosClient';
const quizApi = {
    getAll: (params) => {
        const url = "/quizzes";
        return axiosClient.get(url, { params });
    },
    getDetail: (id) => {
        const url = `/quizzes/${id}`;
        return axiosClient.get(url, {validateStatus: () => true});
    },
    create: (body) => {
        const url = "/quizzes";
        return axiosClient.post(url, body)
    },
    doQuiz: (id) => {
        const url = `sections/1/quizzes/${id}/do`;
        return axiosClient.get(url);
    },
    doneQuiz: (id, body) => {
        const url = `/quizzes/${id}/done`;
        return axiosClient.post(url);
    }
    ,
    update: (id, body) => {
        const url = `/quizzes/${id}`;
        return axiosClient.put(url, body);
    },
    delete: (id, body) => {
        const url = `/quizzes/${id}`;
        return axiosClient.delete(url, body);
    }
}
export default quizApi;