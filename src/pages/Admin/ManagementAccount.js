import React, { Component } from "react";
import SubMenu from '../../components/admin/SubMenu'
import QLListTaiKhoan from "../../components/managementaccounts/QLListTaiKhoan";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import ModalLogOut from "../../components/modal/ModalLogOut";

class ManagementAccount extends Component {
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
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Quản lý tài liệu</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <QLListTaiKhoan></QLListTaiKhoan>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link className="scroll-to-top rounded" to="#page-top">
                    <i className="fa fa-angle-up" />
                </Link>
                <ModalLogOut></ModalLogOut> 
                 </div>
        )
    }
}
export default ManagementAccount;