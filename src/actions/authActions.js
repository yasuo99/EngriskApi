// import * as Types from '../constants/ActionTypes';
import callApi from '../config/apiCaller';

export const signIn = (user) => {
    return dispatch => {
        callApi('/', 'GET', user)
            .then(res => {
                const users = res.data;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].Email === user.email) {
                        if (users[i].Password === user.password) {
                           return( 
                               dispatch({ type: "SIGN_IN" }))
                        }
                        else {
                            return (dispatch({ type: "SIGN_IN_ERR_PASS" }))
                        }
                    }
                } 
                console.log("a");
                return(dispatch({ type: "SIGN_IN_ERR_EMAIL" }))
            });
    };
}

export const signUp = (user) => {
    return dispatch => {
        callApi('/', 'GET', null)
            .then(res => {
                const users = res.data;
                if (user.Password === user.PasswordConfirm) {
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].Email !== user.Email) {
                            callApi('/', 'POST', user)
                                return (dispatch({
                                    type: "SIGN_UP",
                                    user
                                }))
                        }
                    }
                    return (
                        dispatch({
                            type: "SIGN_UP_ERR_EMAIL"
                           
                        })
                    )
                }
                else {dispatch({ type: "SIGN_UP_ERR_PASS" }) }
            })


    }
}
