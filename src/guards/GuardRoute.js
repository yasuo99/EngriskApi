import React from 'react'
import { useJwt } from 'react-jwt';
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const GuardRoute = ({ path, exact, component, guard }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const {decodedToken} = useJwt(localStorage.getItem('token'));
    if (guard) {
        return isLoggedIn ? (
            <Route path={path} exact={exact} component={component} />
        ) : (<Redirect to={{pathname: "/access-denied", state:{url: window.location.pathname}}}></Redirect>)
    }
    else {
        return (
            <Route path={path} exact={exact} component={component} />)
    }
}
export default GuardRoute