import axiosClient from "../config/axiosClient"

const examApi = {
    getAll: (params) => {
        const url = "/exams";
        return axiosClient.get(url,{params});
    },
    getExam: (id) => {
        const url = `/exams/${id}`;
        return axiosClient.get(url);
    },
    doExam: (id) =>  {
        const url = `/exams/${id}/do`;
        return axiosClient.get(url);
    },
    submitExam: (id, body) => {
        const url = `/exams/${id}/done`;
        return axiosClient.post(url,body);
    },
    deleteExam: (id) => {
        const url = `/exams/${id}`;
        return axiosClient.delete(url);
    },
    updateExam: (id,body) => {
        const url = `/exams/${id}`;
        return axiosClient.put(url,body);
    }
}
export default examApi;