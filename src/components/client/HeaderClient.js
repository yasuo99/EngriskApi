import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import ThongBaoClient from "./ThongBaoClient";
import TaiKhoanClient from "./TaiKhoanClient"
import TaiKhoanAdmin from "../admin/TaiKhoanAdmin";
import TinNhanClient from "./TinNhanClient";
import RouteSideNav from "./RouteSideNav";
import { selectRoute } from "../../actions/routeActions";
import { useLocation } from 'react-router-dom'
import accountApiV2 from "../../api/2.0/accountApi";
const HeaderClient = ({openRoute}) => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.auth);
  const account = useSelector(state => state.auth.account)
  const token = localStorage.getItem('token');
  const [routeSideNav, setRouteSideNav] = useState(false);
  const { isExpired, decodedToken } = useJwt(token);
  const location = useLocation();
  const {typeRoute} = useSelector(state => state.route);
  const {route} = useSelector(state => state.route)
  // console.log(decodedToken);
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      dispatch({ type: "TIME_OUT" });
    }
  }, [isLoggedIn])
  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      dispatch({ type: "TOKEN_EXPIRED" });
    }
  }, [isExpired]);
  async function routeSelect(route) {
    console.log(route);
    if(isLoggedIn){
      const result = await accountApiV2.selectRoute(account.id, route.id);
    }

    dispatch(selectRoute(route))
  }
  return (
    <nav id="nav" className="navbar navbar-expand navbar-light bg-white topbar static-top shadow sticky-top">
      {location.pathname === '/home' && <span>
        <div className="cst d-flex" data-qa-xl-flag="en">
          <div onClick={() => setRouteSideNav(!routeSideNav)} className="cst__course-title text-dark">
            <div className='route-wrap'><img className='path route-icon' src='./image/compass.png'></img>
            </div>
            <div className='path-title'><h5 className='route-nav-header'>Lộ trình</h5>
            </div><i className="fa fa-chevron-right text-dark"></i></div></div>
        <RouteSideNav display={routeSideNav} typeRoute={typeRoute} selectRoute={routeSelect} />
        </span>}
      <ul className="navbar-nav ml-auto">
        <ThongBaoClient></ThongBaoClient>
        {isLoggedIn && <TinNhanClient></TinNhanClient>}
        <div className="topbar-divider d-none d-sm-block" />
        {(account.roles.some(el => el === "superadmin") || account.roles.some(el => el === "manager")) && <TaiKhoanAdmin account={account}></TaiKhoanAdmin>}
        {(account.roles.some(el => el !== "superadmin") && account.roles.some(el => el !== "manager") || !isLoggedIn) && <TaiKhoanClient status={isLoggedIn} account={account}></TaiKhoanClient>}</ul>
    </nav>

  )
}
export default HeaderClient;