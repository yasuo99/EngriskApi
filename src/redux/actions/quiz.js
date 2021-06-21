import AsyncStorage from "@react-native-async-storage/async-storage"
// import {AsyncStorage} from 'react-native';
import axiosClient from "../../utils/axiosClient"

export const QuizActionTypes = {
    GET_ALL: 'GET_ALL',
    DO: 'DO_QUIZ',
    DONE: 'DONE_QUIZ'
}
Object.keys(QuizActionTypes).forEach((key) => {
    QuizActionTypes[key] = `QUIZ_${QuizActionTypes[key]}`
})
const getAllQuiz = async () => {
    const quizzes = await axiosClient.get('/quizzes')
    return({

    })
}
const doQuiz = async (id) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const quiz = await axiosClient.get(`/quizzes/${id}/do`, {headers})
    return({

    })
}
const doneQuiz = async (id) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const quiz = await axiosClient.get(`/quizzes/${id}/done`, {headers})
    return({

    })
}