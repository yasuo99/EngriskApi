import axiosClientv2 from "../../config/axiosClientv2"

const questionApiV2 = {
    checkAnswer: async (id,answer) => {
        const url = `/questions/${id}/check?answer=${answer}`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{headers})
    }
}
export default questionApiV2