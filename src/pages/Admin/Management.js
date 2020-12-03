import React, { Component } from "react";
import SubMenu from '../../components/admin/SubMenu'
import QLListTuVung from "../../components/admin/QLListTuVung";
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
                                <h1 className="h3 mb-2 text-gray-800">Tables</h1>
                                <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the <Link target="_blank" to="https://datatables.net">official DataTables documentation</Link>.</p>
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <QLListTuVung></QLListTuVung>
                                        </div>
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