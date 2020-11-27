import wordApi from '../api/wordApi';

export const getAllWord = (params) => {
    return wordApi.getAll(params);
}
export const getWord = (id) => wordApi.getDetail(id);

export const updateWord = (id, body) => {
    return wordApi.update(id,body);
}
export const deleteWord = (id) =>  wordApi.delete(id);

