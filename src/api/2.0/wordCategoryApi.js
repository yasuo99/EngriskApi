import axiosClientv2 from "../../config/axiosClientv2";

const wordCategoryApi = {
  getAll: async (params) => {
    const url = "/wordcategories";
    return await axiosClientv2.get(url, { params });
  },
  getAllWithoutPaginate: async () => {
    const url = "/wordcategories/all";
    return await axiosClientv2.get(url);
  },
  getDetail: async (id) => {
    const url = `/wordcategories/${id}`;
    return await axiosClientv2.get(url);
  },
  getUserDetail: async (id) => {
    const tempUrl = `/wordcategories/${id}/users/${
      JSON.parse(localStorage.getItem("account")).id
    }`;
    console.log(tempUrl);
    return await axiosClientv2.get(tempUrl);
  },
  createWordCategory: async (body) => {
    const url = "/wordcategories";
    return await axiosClientv2.post(url, body);
  },
  updateWordCategory: async (id, body) => {
    const url = `/wordcategories/${id}`;
    return await axiosClientv2.put(url, body);
  },
  deleteWordCategory: async (id) => {
    const url = `/wordcategories/${id}`;
    return await axiosClientv2.delete(url);
  },
};
export default wordCategoryApi;
