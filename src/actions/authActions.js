// import * as Types from '../constants/ActionTypes';
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
        });
    }
}
export const signIn = (user) => {
    return dispatch => {
        const url = "/accounts/login";
        axiosClient.post(url, user)
            .then(res => {
                console.log(res)
                if (res.token) {
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
            }, error => {
                return (dispatch({ type: "SIGN_IN_ERR_PASS" }));
            }).catch((error) => {
                console.log(error);
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
