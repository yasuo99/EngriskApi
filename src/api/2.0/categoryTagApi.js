import axiosClientv2 from "../../config/axiosClientv2";

const categoryTagApi = {
    getAll: async (params) => {
        const url = `/categorytag`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{params,headers});
    }
}
export default categoryTagApi