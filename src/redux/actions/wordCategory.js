import axiosClient from "../../utils/axiosClient"

export const WordCategoriesActionsTypes = {
    GET_ALL: 'GET_ALL',
    GET_DETAIL: 'GET_DETAIL',
}
Object.keys(WordCategoriesActionsTypes).forEach((key) => {
    WordCategoriesActionsTypes[key] = `WORDCATEGORY_${WordCategoriesActionsTypes[key]}`
})
const getAll = async () => {
    const url = `/wordCategories`
    const headers = {
        Authorization: `Bearer {token}`
    }
    const data = await axiosClient.get(url);
    return{
        type: WordCategoriesActionsTypes.GET_ALL,
        data: data
    }
}
const getDetail = async (WordCategoryId) => {
    const url = `/wordCategories/${WordCategoryId}`
    const headers = {
        Authorization: `Bearer {token}`
    }
    const data = await axiosClient.get(url)
    return {
        type: WordCategoriesActionsTypes.GET_ALL,
        data: data
    }
}

const WordCategoriesActions = {
    getAll: getAll,
    getDetail: getDetail
}
export default WordCategoriesActions