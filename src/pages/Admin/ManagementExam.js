import React, { Component } from "react";
import SubMenu from '../../components/admin/SubMenu'
import QLListExam from "../../components/managementexams/QLListExam";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import ModalLogOut from "../../components/modal/ModalLogOut";

class ManagementExam extends Component {
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
                                        <h6 className="m-0 font-weight-bold text-primary">Quản lý bài exam</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <QLListExam></QLListExam>
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
export default ManagementExam;