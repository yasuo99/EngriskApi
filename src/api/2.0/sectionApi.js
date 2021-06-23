import axiosClientv2 from "../../config/axiosClientv2";

const sectionApiV2 = {
    getAll: async (params) => {
        const url = `/sections`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers, params })
    },
    start: async (id) => {
        const url = `/sections/${id}/vocabulary`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    getSectionProgressReview: async (id) => {
        const url = `/sections/${id}/finish-up`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    getFreeSections: async () => {
        const url = '/sections/free';
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    preview: async (id) => {
        const url = `/sections/${id}/preview`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    }
}
export default sectionApiV2;