import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import ThongBaoClient from "./ThongBaoClient";
import TaiKhoanClient from "./TaiKhoanClient"
const HeaderClient = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const {isLoggedIn} = useSelector((state) => state.auth.isLoggedIn);
  const token = localStorage.getItem('token');
  let account;
  const { isExpired } = useJwt(token);
  useEffect(() => {
    if (isExpired || isLoggedIn == false) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      setLoggedIn(false);
    }
    else {
      setLoggedIn(true);
      account = localStorage.getItem('account')
    }
  })
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