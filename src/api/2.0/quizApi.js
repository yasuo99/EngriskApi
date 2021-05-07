import axiosClientv2 from "../../config/axiosClientv2";
const clientUrl = `account/${JSON.parse(localStorage.getItem('account'))?.id}/quizzes`
const adminUrl = '/quizzes'
const quizApi = {
    getAll: async () => {
       return await  axiosClientv2.get()
    },
    create: async (quiz) => {
        return await axiosClientv2.post(adminUrl, quiz);
    }
}
export default quizApi;