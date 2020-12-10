import axiosClient from '../config/axiosClient'
const endpoint = '/words'
const wordApi = {
    
    getAll: (params) => {
        const url = endpoint;
        return axiosClient.get(url,{params}).then((response) => {
            return response;
        }).catch((error) => {
            console.log(error);
        });
    },
    getDetail: (id) => {
        const url = `/words/${id}`;
        return axiosClient.get(url);
    },
    searchDetail: (params) => {
        const url = `/words/detail`;
        return axiosClient.get(url,{params});
    }
    ,
    searchWord: (keyword,params) => {
        const url = `/words/search/${keyword}`;
        return axiosClient.get(url,{params});
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