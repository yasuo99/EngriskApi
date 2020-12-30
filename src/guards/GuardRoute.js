import React from 'react'
import { decodeToken, useJwt } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const GuardRoute = ({ path, exact, component, guard, roles }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const account = JSON.parse(localStorage.getItem('account'));
    if (guard) {
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        console.log(decodedToken);
        if (isLoggedIn) {
            if (roles.length > 0) {
                console.log(roles);
                if (Array.isArray(decodedToken.role)) {
                    return decodedToken.role.some(el => roles.includes(el)) ? (
                        <Route path={path} exact={exact} component={component} />
                    ) : (<Redirect to={{ pathname: "/access-denied", state: { url: window.location.pathname } }}></Redirect>);
                }
                else {
                    return roles.some(el => el === decodedToken.role) ? (<Route path={path} exact={exact} component={component} />) : (<Redirect to={{ pathname: "/access-denied", state: { url: window.location.pathname } }}></Redirect>);
                }
            }
            else {
                return (<Route path={path} exact={exact} component={component} />);
            }
        }
        else {
            return (<Redirect to={{ pathname: "/access-denied", state: { url: window.location.pathname } }}></Redirect>);
        }
    }
    else {
        return (
            <Route path={path} exact={exact} component={component} />)
    }
}
export default GuardRoute