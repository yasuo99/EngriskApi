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
    disableAccount: (id, body) => {
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
    forgetPassword: (email) => {
        const url =`/accounts/forget-pw?email=${email}`;
        return axiosClient.get(url);
    },
    resetPassword: (otp,email, newPassword, confirmPassword) => {
        const url = `/accounts/reset-pw`;
        const body = {
            otp: otp,
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };
        return axiosClient.post(url,body);
    },
    changePassword: (accountId,currentPassword,newPassword) => {
        const url = `/accounts/${accountId}/changepw`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        };
        const body = {
            currentPassword: currentPassword,
            newPassword: newPassword
        };
        return axiosClient.put(url, body,{headers});
    }
}
export default accountApi;