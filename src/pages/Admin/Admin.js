import React, { Component } from "react";
import FormSearchAdmin from "../../components/admin/FormSearchAdmin";
import ListTinNhan from "../../components/admin/ListTinNhan";
import SubMenu from '../../components/admin/SubMenu'
import ThongBao from "../../components/admin/ThongBao";
import FormAdmin from "../../components/admin/FormAdmin";
import DashBoard from "../../components/admin/DashBoard";

class Admin extends Component {

  render() {
    return (
      <div>
        <div id="wrapper">
          <SubMenu></SubMenu>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars" />
                </button>
                <FormSearchAdmin></FormSearchAdmin>
                <ul className="navbar-nav ml-auto">
                  <ThongBao></ThongBao>
                  <ListTinNhan></ListTinNhan>
                  <div className="topbar-divider d-none d-sm-block" />
                  <FormAdmin></FormAdmin>
                </ul>
              </nav>

              <DashBoard></DashBoard>
            </div>
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Thanh Lập</span>
                </div>
              </div>
            </footer>
          </div>
        </div>


      </div>
    )
  }
}


export default Admin;
