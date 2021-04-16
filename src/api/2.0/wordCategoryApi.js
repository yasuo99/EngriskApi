import axiosClientv2 from "../../config/axiosClientv2";
const url = "/wordcategories"
const wordCategoryApi = {
    getAll: async () => {
        return await axiosClientv2.get(url);
    },
    getDetail: async (id) => {
        return await axiosClientv2.get(url + `/${id}`);
    },
    createWordCategory: async (body) => {
        return await axiosClientv2.post(url, body);
    },
    updateWordCategory: async (id, body) => {
        return await axiosClientv2.put(url + `/${id}`, body);
    },
    deleteWordCategory: async (id) => {
        return await axiosClientv2.delete(url + `/${id}`)
    }

}
export default wordCategoryApi;