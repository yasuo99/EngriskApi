import axiosClient from "../config/axiosClient";

const groupApi = {
    getAll:(params) => {
        const url = `/groups`;
        return axiosClient.get(url,{params});
    },
    getGroupsOfAccount: (accountId) => {
        const url = `/groups/accounts/${accountId}`;
        return axiosClient.get(url);
    },
    getDetail: (id) => {
        const url = `/groups/${id}`;
        return axiosClient.get(url);
    },
    createGroup: (accountId, body) => {
        const url = `/groups`;
        return axiosClient.post(url,body);
    },
    updateGroup: (id, body) => {
        const url = `/groups/${id}`;
        return axiosClient.put(url,body);
    },
    deleteGroup: (id) => {
        const url =  `/groups/${id}`;
        return axiosClient.delete(url);
    }

};
export default groupApi;