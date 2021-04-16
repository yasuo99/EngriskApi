import axiosClientv2 from "../../config/axiosClientv2";

const wordApi = {
    getAll: async () => {
        const url = "/words";
        return axiosClientv2.get(url).catch(err => {
            console.log(err);
        })
    }
}
export default wordApi;