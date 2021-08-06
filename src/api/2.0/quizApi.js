import axiosClientv2 from "../../config/axiosClientv2";
const clientUrl = `account/${JSON.parse(localStorage.getItem('account'))?.id}/quizzes`
const quizApi = {
    getAll: async (params) => {
        const adminUrl = '/quizzes'
        return await axiosClientv2.get(adminUrl, { params })
    },
    get: async (id) => {
        const url = `/quizzes/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    edit: async (id, body) => {
        const url = `/quizzes/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, body, { headers });
    },
    getUserQuizzes: async (id) => {
        const url = `/quizzes/user/${JSON.parse(localStorage.getItem('account')).id}`;
        return await axiosClientv2.get(url);
    },
    create: async (quiz) => {
        const url = "/quizzes";
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, quiz, { headers });
    },
    createQuizQuestion: async (id,body) => {
        const url = `/quizzes/${id}/questions`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, body, { headers });
    }
    ,
    doQuiz: async (id) => {
        const url = `/quizzes/${id}/do`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    doneQuiz: async (id) => {
        const url = `/quizzes/${id}/done`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    checkAnswer: async (id, answer) => {
        const url = `/quizzes/${id}/do`
        return await axiosClientv2.post(url);
    },
    getUserQuizzes: async (id, params) => {
        const url = `/quizzes/users/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { params, headers });
    },
    delete: async (id) => {
        const url = `/quizzes/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.delete(url, { headers });
    },
    publishChange: async (id,params) => {
        const url = `/quizzes/${id}/publish/change`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url,null, { params, headers });
    }
}
export default quizApi;