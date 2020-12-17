import axiosClient from "../config/axiosClient";

const accountApi = {
    getAll: () => {
        const url = "/accounts";
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        return axiosClient.get(url, { headers });
    },
    getDetail: (id) => {
        const url = `/accounts/${id}`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        return axiosClient.get(url, { headers });
    },
    updateAccount: (id, body) => {
        const url = `/accounts/${id}`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        return axiosClient.put(url, body, { headers });
    },
    banAccount: (id, body) => {
        const url = `/accounts/${id}/ban`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        const params = {
            hour: body
        }
        return axiosClient.put(url, null, { params, headers });
    },
    disableAccount: (id) => {
        const url = `/accounts/${id}/ban`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        const params = {
            hour: body
        }
        return axiosClient.put(url, null, { params, headers });
    }
}
export default accountApi;