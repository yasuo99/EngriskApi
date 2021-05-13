import axiosClientv2 from "../../config/axiosClientv2";

const examApiv2 = {
    create: async (data, side) => {
        const url = side ? "/exams" : `/exams/user/${JSON.parse(localStorage.getItem('account')).id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, data, {headers});
    }
}
export default examApiv2;