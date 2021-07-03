import axiosClientV1 from "../../utils/axiosClientV1"

export const ExamsActionsTypes = {
    GET_ALL: 'GET_ALL',
}
Object.keys(ExamsActionsTypes).forEach((key) => {
    ExamsActionsTypes[key] = `EXAM_${ExamsActionsTypes[key]}`
})
const getAll = async () => {
    const url = `/exams`
    const headers = {
        Authorization: `Bearer {token}`
    }
    const data = await axiosClientV1.get(url);
    return{
        type: ExamsActionsTypes.GET_ALL,
        data: data
    }
}

const ExamsActions = {
    getAll: getAll,
}
export default ExamsActions