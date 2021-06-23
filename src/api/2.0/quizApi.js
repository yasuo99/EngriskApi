import axiosClientv2 from "../../config/axiosClientv2";
const clientUrl = `account/${JSON.parse(localStorage.getItem('account'))?.id}/quizzes`
const quizApi = {
    getAll: async () => {
        const adminUrl = '/quizzes'
        return await axiosClientv2.get(adminUrl)
    },
    getUserQuizzes: async (id) => {
        const url = `/quizzes/user/${JSON.parse(localStorage.getItem('account')).id}`;
        return await axiosClientv2.get(url);
    },
    create: async (quiz, side) => {
        const url = side ? "/quizzes": `/quizzes/user/${JSON.parse(localStorage.getItem('account')).id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, quiz, {headers});
    },
    doQuiz: async (id) => {
        const url = `/sections/${id}/learn`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, {headers});
    },
    checkAnswer: async (id, answer) => {
        const url = `/quizzes/${id}/do`
        return await axiosClientv2.post(url);
    },
    getUserQuizzes: async (id) => {
        const url = `/quizzes/users/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, {headers});
    },
}
export default quizApi;