import axiosClientv2 from "../../config/axiosClientv2";

const certificateApi = {
    getAll: async (params) => {
        const url = `/certificate`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{params,headers})
    },
    getManage: async (params) => {
        const url = `/certificate/manage`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{params,headers})
    }
}
export default certificateApi