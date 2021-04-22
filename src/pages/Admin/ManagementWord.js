import React, { Component } from "react";
import SubMenu from '../../components/admin/SubMenu'
import QLListTuVung from "../../components/managementwords/QLListTuVung";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { Button } from "react-bootstrap"
class ManagementWord extends Component {
    render() {
        // const renderQuestions = (() =>
        //     <tr>
        //         <td>Hello</td>
        //         <td>Danh từ</td>
        //         <td>Giao tiếp hằng ngày</td>
        //         <td>Hi</td>
        //         {/* <td>Xin chào</td> */}
        //         <td>
        //             <Button variant="primary" className="btn btn-primary mr-2" ><i className="fa fa-edit" /></Button>
        //             <Button variant="primary" className="btn btn-danger"><i className="fa fa-trash" /></Button>
        //         </td>
        //     </tr>)
        return (
            <div>
                <div id="wrapper">
                    <SubMenu></SubMenu>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderAdmin></HeaderAdmin>
                            <div className="container-fluid ql_word">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Quản lý từ vựng</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <Link variant="primary" className="btn btn-word mr-2 mb-3" to="/tuvung"><i className="fa fa-plus" /> Thêm từ vựng</Link>
                                            {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                                <thead>
                                                    <tr>
                                                        <th className="tuvung">Từ vựng</th>
                                                        <th className="loaitu">Loại từ</th>
                                                        <th className="chude">Chủ đề</th>
                                                        <th className="tudongnghia">Từ đồng nghĩa</th>
                                                        <th className="nghia">Nghĩa từ vựng</th>
                                                        <th className="chucnang" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Hello</td>
                                                        <td>Danh từ</td>
                                                        <td>Giao tiếp hằng ngày</td>
                                                        <td>Hi</td>
                                                        <td>Xin chào</td>
                                                        <td>
                                                            <Button variant="primary" className="btn btn-edit mr-2" ><Link to='/tuvung' className="fa fa-edit"></Link></Button>
                                                            <Button variant="primary" className="btn btn-delete"><i className="fa fa-trash" /></Button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
                <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Bạn có chắc chắn muốn đăng xuất không?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Chọn "Đăng xuất" bên dưới nếu bạn đã sẵn sàng kết thúc phiên hiện tại của mình.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                                <Link className="btn btn-primary" to="login.html">Đăng xuất</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ManagementWord;