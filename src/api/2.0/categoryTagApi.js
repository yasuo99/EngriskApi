import axiosClientv2 from "../../config/axiosClientv2";

const categoryTagApi = {
    getAll: async (params) => {
        const url = `/categorytag`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{params,headers});
    },
    getAllWithoutPaginate: async () => {
        const url = `/categorytag/all`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{headers});
    }
}
export default categoryTagApi