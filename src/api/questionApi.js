import axiosClient from '../config/axiosClient';
const questionApi = {
    getAll: () => {
        const url = "/questions/";
        return axiosClient.get(url);
    },
    getDetail: (id) => {
        const url = `/questions/${id}`;
        return axiosClient.get(url);
    },
    createQuestion: (body) => {
        const url = '/questions';
        return axiosClient.post(url,body);
    },
    updateQuestion: (id, body) => {
        const url = `/questions/${id}`;
        return axiosClient.put(url, body);
    },
    deleteQuestion: (id) => {
        const url = `/questions/${id}`;
        return axiosClient.delete(url);
    }
}
export default questionApi;