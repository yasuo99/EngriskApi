import { toast } from 'react-toastify';
import wordApi from '../api/wordApi';

export const getAllWord = (params) => {
    return  wordApi.getAll(params).then(response => {
        toast('Thêm từ vựng thành công')
        return response;
    }).catch(error => {
        toast(error.response.data.error)
    });
}
export const getWord = (id) => wordApi.getDetail(id);

export const updateWord = (id, body) => {
    return wordApi.update(id,body);
}
export const deleteWord = (id) =>  wordApi.delete(id);

export const createWord = (body) =>  {
    return wordApi.create(body).catch((error) => {
        toast(error.response.data.error)
    })
};