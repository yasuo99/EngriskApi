import React, { Component } from "react";
import SubMenu from '../../components/admin/SubMenu'
import QLThemTuVung from "../../components/admin/QLThemTuVung";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";

class Management extends Component {
    render() {
        return (
            <div>
                <div id="wrapper">
                    <SubMenu></SubMenu>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderAdmin></HeaderAdmin>
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
                <Link className="scroll-to-top rounded" to="#page-top">
                    <i className="fa fa-angle-up" />
                </Link>
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
                                <Link className="btn btn-primary" to="login.html">Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Management;