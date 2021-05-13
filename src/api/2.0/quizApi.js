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
    }
}
export default quizApi;