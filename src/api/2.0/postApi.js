import axiosClientv2 from "../../config/axiosClientv2"

const postApiV2 = {
    getAll: async (type) => {
        const url = `/posts?type=${type}`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{headers})
    },
    getManage: async (params) => {
        const url = `/posts/manage`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{params,headers})
    }
}
export default postApiV2;