import axiosClientv2 from "../../config/axiosClientv2";

const routeApi = {
    adminGetAll: async (params) => {
        const url = `/routes`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers, params })
    },
    getAllEngriskRoute: async (id) => {
        const url = `/routes/users/${id}`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    getNearestFinishRoute: async (id) => {
        const url = `/routes/users/${id}/nearest-finish`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers})
    },
    getAnonymousRoute: async () => {
        const url = `/routes/anonymous`;
        return await axiosClientv2.get(url)
    },
    userGetAll: async () => {

    },
    getRouteSections: async (id) => {
        const url = `/routes/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    createRoute: async (body) => {
        const url = `/routes`;
        return await axiosClientv2.post(url, body);
    },
    changeRouteStatus: async (id) => {
        const url = `/routes/${id}/status`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url,{headers});
    },
    editSectionsRoute: async (id,sections) => {
        const url = `/routes/${id}/sections`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url,sections,{headers});
    }

}
export default routeApi;