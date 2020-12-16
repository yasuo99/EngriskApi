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
    submitQuestion: (id,body) => {
        let token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        };
        const url = `/questions/${id}/check`;
        return axiosClient.post(url,body, {headers});
    }
    ,
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