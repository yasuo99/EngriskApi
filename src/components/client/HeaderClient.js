import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import ThongBaoClient from "./ThongBaoClient";
import TaiKhoanClient from "./TaiKhoanClient"
import TaiKhoanAdmin from "../admin/TaiKhoanAdmin";
import { Link } from "react-router-dom";

const HeaderClient = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const account = useSelector(state => state.auth.account)
  const token = localStorage.getItem('token');
  const { isExpired } = useJwt(token);
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      setLoggedIn(false);
      dispatch({ type: "TIME_OUT" });
    }
    else {
      setLoggedIn(true);
      const temp = JSON.parse(localStorage.getItem('account'));
    }
  }, [isLoggedIn])
  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      dispatch({ type: "TOKEN_EXPIRED" });
    }
  }, [isExpired]);
  return (
    <nav id="nav" className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars" />
      </button>
      <ul className="navbar-nav ml-auto">
        <ThongBaoClient></ThongBaoClient>
        <div className="topbar-divider d-none d-sm-block" />
        {(account.roles.some(el => el === "superadmin") || account.roles.some(el => el === "manager")) && <TaiKhoanAdmin account={account}></TaiKhoanAdmin>}
        {(account.roles.some(el => el !== "superadmin") && account.roles.some(el => el !== "manager") || !isLoggedIn) && <TaiKhoanClient status={isLoggedIn} account={account}></TaiKhoanClient>}</ul>
    </nav>

  )
}
export default HeaderClient;