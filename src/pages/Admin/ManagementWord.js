import React, { Component } from "react";
import FormSearchAdmin from "../../components/admin/FormSearchAdmin";
import ListTinNhan from "../../components/admin/ListTinNhan";
import SubMenu from '../../components/admin/SubMenu'
import ThongBao from "../../components/admin/ThongBao";
import FormAdmin from "../../components/admin/FormAdmin";
import QLListTuVung from "../../components/admin/QLListTuVung";
import QLThemTuVung from "../../components/admin/QLThemTuVung";

class Management extends Component {
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
                            <div className="container-fluid">
                              <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <QLThemTuVung></QLThemTuVung>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2020</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fa fa-angle-up" />
                </a>
                <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Management;