import axiosClientv2 from "../../config/axiosClientv2";

const wordApiV2 = {
    getAll: async (params) => {
        const url = "/words";
        return axiosClientv2.get(url, {params}).catch(err => {
            console.log(err);
        })
    },
    createMem: async (id, body) => {
        const url = `/words/${id}/memories`;
        const headers = {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.post(url, body, {headers}).catch(err => {
            console.log(err);
        })
    },
    selectMemory: async (id, memId) => {
        const url = `/words/${id}/memories/${memId}`;
        const headers = {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.put(url, null, {headers}).catch(err => {
            console.log(err);
        })
    },
    vocabularyReview: async (words) => {
        const url = `/words/review`;
        return await axiosClientv2.post(url, words);
    }
}
export default wordApiV2;