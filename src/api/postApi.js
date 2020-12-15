const { default: axiosClient } = require("../config/axiosClient")

const postApi = {
    getAll: () => {
        const url = "/posts";
        return axiosClient.get(url);
    },
    getNewPost: (params) => {
        const url = "/posts/new";
        return axiosClient.get(url,{params});
    },
    getHighRate: (params) => {
        const url = "/posts/rating";
        return axiosClient.get(url);
    },
    getFollowing: (id,token) => {
        const url = `/accounts/${id}/posts-following`;
        return axiosClient.get(url, {headers: {'Authorization': `Bearer ${token}`}});
    },
    getDetail: (id, params) => {
        const url = `/posts/${id}`;
        return axiosClient.get(url,{params});
    },
    createPost: (body) => {
        let token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        const url = `/posts`;
        return axiosClient.post(url,body,{headers});
    },
    updatePost: (id,body) => {
        const url = `/posts/${id}`;
        return axiosClient.put(url,body);
    },
    deletePost: (id) => {
        const url = `/posts/${id}`;
        return axiosClient.delete(url);
    },
    lockPost: (id) => {
        const url = `/posts/${id}/lock`;
        return axiosClient.put(url);
    },
    commentToPost: (id, body) => {
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        const url = `/posts/${id}/comments`;
        return axiosClient.post(url,body, {headers: headers});
    },
    ratingPost: (id) => {

    }
}
export default postApi;