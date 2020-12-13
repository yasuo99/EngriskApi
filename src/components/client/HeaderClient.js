import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import ThongBaoClient from "./ThongBaoClient";
import TaiKhoanClient from "./TaiKhoanClient"

const HeaderClient = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = localStorage.getItem('token');
  const { isExpired } = useJwt(token);
  useEffect(() => {
    if (isExpired || isLoggedIn == false) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      setLoggedIn(false);
      setAccount(null);
    }
    else {
      setLoggedIn(true);
      const temp = JSON.parse(localStorage.getItem('account'));
      setAccount(temp)
    }
  },[isLoggedIn])
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
    <ul className="navbar-nav ml-auto">
      <ThongBaoClient></ThongBaoClient>
       <div className="topbar-divider d-none d-sm-block" />
       <TaiKhoanClient status={loggedIn} account={account}></TaiKhoanClient></ul>
  </nav>

   )
}
export default HeaderClient;