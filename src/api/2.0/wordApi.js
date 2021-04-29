import axiosClientv2 from "../../config/axiosClientv2";

const wordApi = {
    getAll: async () => {
        const url = "/words";
        return axiosClientv2.get(url).catch(err => {
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
    }
}
export default wordApi;