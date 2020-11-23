import wordApi from '../api/wordApi';

export const getAllWords = () => {
    return wordApi.getAll();
}