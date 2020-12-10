import examApi from "../api/examApi"

export const getAllExam = () => {
    return examApi.getAll();
}
export const doExam = id => {
    return examApi.doExam(id);
}
export const doneExam = (id,body) => {
    return examApi.submitExam(id,body);
}
export const getExam = id => {
    return examApi.getExam(id);
}
export const updateExam = (id, body) => {
    return examApi.updateExam(id,body);
}
export const deleteExam = (id) => {
    return examApi.deleteExam(id);
}