import axiosClient from "../config/axiosClient"

const examApi = {
    getAll: () => {
        const url = "/exams";
        return axiosClient.get(url);
    },
    doExam: (id) =>  {
        const url = `/exams/${id}/do`;
        return axiosClient.get(url);
    },
    submitExam: (id, body) => {
        const url = `/exams/${id}/done`;
        return axiosClient.post(url,body);
    }
}
export default examApi;