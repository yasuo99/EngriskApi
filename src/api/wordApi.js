import axiosClient from '../config/axiosClient'
const endpoint = '/words'
const wordApi = {
    
    getAll: (params) => {
        const url = endpoint;
        return axiosClient.get(url,{params});
    },
    getDetail: (id) => {
        const url = `/words/${id}`;
        return axiosClient.get(url);
    },
    create: (body) => {
        const url = "/words"
        return axiosClient.post(url,body)
    },
    update: (id,body) => {
        const url = `/words/${id}`;
        return axiosClient.put(url,body);
    },
    delete: (id, body) => {
        const url = `/words/${id}`;
        return axiosClient.delete(url, body);
    }
}
export default wordApi;