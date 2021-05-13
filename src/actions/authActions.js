// import * as Types from '../constants/ActionTypes';
import { toast } from 'react-toastify';
import axiosClient from '../config/axiosClient';

export const googleSignIn = (token) => {
    return dispatch => {
        const url = "/accounts/login/google";
        axiosClient.post(url, token).then(response => {
            console.log(response);
            if (response.token) {
                localStorage.setItem('account', JSON.stringify(response.account));
                localStorage.setItem('token', response.token);
            }
            return (
                dispatch({ type: "SIGN_IN", account: response.account, token: response.token }))
        })
    }
}
export const facebookSignIn = (token) => {
    return dispatch => {
        const url = "/accounts/login/facebook";
        axiosClient.post(url, token).then(response => {
            console.log(response);
            if (response.token) {
                localStorage.setItem('account', JSON.stringify(response.account));
                localStorage.setItem('token', response.token);
            }
            return (
                dispatch({ type: "SIGN_IN", account: response.account, token: response.token }))
        }).catch(error => {
        });
    }
}
export const signIn = (user) => {
    return dispatch => {
        const url = "/accounts/login";
        axiosClient.post(url, user)
            .then(res => {
                console.log(res);
                if (res) {
                    localStorage.setItem('account', JSON.stringify(res.account));
                    localStorage.setItem('token', res.token);
                    return (
                        dispatch({ type: "SIGN_IN", account: res.account, token: res.token }))
                }
                // for (var i = 0; i < users.length; i++) {
                //     if (users[i].Email === user.email) {
                //         if (users[i].Password === user.password) {
                //            return( 
                //                dispatch({ type: "SIGN_IN" }))
                //         }
                //         else {
                //             return (dispatch({ type: "SIGN_IN_ERR_PASS" }))
                //         }
                //     }
                // } 
                // console.log("a");
                // return(dispatch({ type: "SIGN_IN_ERR_EMAIL" }))
            }).catch((error) => {
                if(error.response.status == 401){
                    toast(error.response.data.error, {type: 'error'});
                }
                if(error.response.status == 400){
                    return(dispatch({ type: "SIGN_IN_ERR"}))
                }
            });
    };
}

export const signUp = (user) => {
    return dispatch => {
        const url = "/accounts/register";
        axiosClient.post(url, user)
            .then(res => {
                if (res) {
                    console.log(res);
                    return dispatch({ type: "SIGN_UP" });
                }
                return dispatch({ type: "SIGN_UP_ERROR" });
            })


    }
}
export const logout = () => {
    return dispatch => {
        return dispatch({ type: "SIGN_OUT" });
    }
}
export const logOut = () => {
    return ({
        type: "SIGN_OUT"
    })
}
export const timeOut = () => {
    return ({
        type: "TIME_OUT"
    })
}