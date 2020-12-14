import React, { Component } from "react"
import { Link } from "react-router-dom"
import FormSearchAdmin from "./FormSearchAdmin";
import TaiKhoanAdmin from "./TaiKhoanAdmin";
import ThongBaoAdmin from "./ThongBaoAdmin";
import ListTinNhan from "./ListTinNhan";

class HeaderAdmin extends Component {
  render() {
    const account = JSON.parse(localStorage.getItem('account'));
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars" />
        </button>
        <FormSearchAdmin></FormSearchAdmin>
        <ul className="navbar-nav ml-auto">
          <ThongBaoAdmin></ThongBaoAdmin>
          <ListTinNhan></ListTinNhan>
          <div className="topbar-divider d-none d-sm-block" />
          <TaiKhoanAdmin account={account}></TaiKhoanAdmin>
        </ul>
      </nav>
    )
  }
}
export default HeaderAdmin;