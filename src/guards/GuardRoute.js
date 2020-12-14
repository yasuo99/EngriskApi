import React from 'react'
import { useJwt } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const GuardRoute = ({ path, exact, component, guard, roles }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const account = JSON.parse(localStorage.getItem('account'));
    if (guard) {
        if(account){
            if(account.roles.includes('superadmin')){
                console.log('ok');
            }
        }
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