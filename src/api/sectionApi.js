import axiosClient from "../config/axiosClient";

const sectionApi = {
    getAll: (params, auth) => {
        const url = "/sections";
        let header = ''
        if (auth) {
            const token = localStorage.getItem('token');
            header = {
                "Authorization": "Bearer " + token
            }
        }
        return axiosClient.get(url, { params, headers: header });
    },
    doQuiz: (id, params) => {
        const url = `/sections/${id}/do`;
        return axiosClient.get(url,{params});
    },
    doneQuiz: (sectionId, quizId, auth) => {
        const url = `/sections/${sectionId}/quizzes/${quizId}/done`;
        let header = ''
        if (auth) {
            const token = localStorage.getItem('token');
            header = {
                "Authorization": "Bearer " + token
            }
        }
        return axiosClient.post(url,{headers: header});
    },
    getDetail: (id) => {
        const url = `/sections/${id}`;
        return axiosClient.get(url);
    },
    create: (body) => {
        const url = `/sections`;
        return axiosClient.post(body);
    },
    update: (id, body) => {
        const url = `/sections/${id}`;
        return axiosClient.put(url, body);
    },
    delete: (id) => {
        const url = `/sections/${id}`;
        return axiosClient.delete(url);
    }
}
export default sectionApi;