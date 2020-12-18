import React, { Component } from "react"
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
// import accountApi from "../../api/accountApi";
import { Button, Modal } from 'react-bootstrap'
class QLListTaiKhoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDelete: false,
            modalDetail: false,

            accounts: [],
        };
    }
    componentDidMount() {

        $(function () {
            $("#dataTable").DataTable();
        });
    }
    // fetchAccount = async () => {
    //     return await accountApi.getAll();
    // }
    // Xử lý modal detail
    openDetail() {
        this.setState({ modalDetail: true });
    }
    closeDetail() {
        this.setState({
            modalDetail: false,
        });
    }
    submitDetail(e) {
        this.setState({
        });
        this.closeDetail();
    }
    // Xử lý modal delete
    openDelete() {
        this.setState({ modalDelete: true });
    }
    closeDelete() {
        this.setState({
            modalDelete: false,
        });
    }
    submitDelete(e) {
        this.setState({

        });
        this.closeDelete();
    }
    render() {
        const renderAccounts = (() =>
            <tr>
                {/* XỬ LÝ DATA */}
                <td>
                    <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openDetail(e)}><i className="fa fa-info" /></Button>
                    <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                </td>
            </tr>
        );
        return (
            <div>
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="taikhoan">Tên tài khoản</th>
                            <th className="email">Email</th>
                            <th className="hoten">Họ và tên</th>
                            <th className="sdt">Số điện thoại</th>
                            <th className="chucnang" />
                            <th className="lock"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderAccounts}
                    </tbody>
                </table>
                {/* Modal phần xóa */}
                <Modal show={this.state.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa tài khoản này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần xem chi tiết */}
                <Modal show={this.state.modalDetail}>
                    <Modal.Header closeButton onClick={() => this.closeDetail()}>
                        <Modal.Title>Thông tin chi tiết tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group form-group-account">
                            <div className="card-input mt-4">
                                <span>Tên tài khoản:</span>&nbsp;
                                <span>NguyenLap</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Email:</span>&nbsp;
                                <span>Lap@gmail.com</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Họ và tên:</span>&nbsp;
                                <span>Nguyễn Thanh Lập</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Số điện thoại:</span>&nbsp;
                                <span>03.3939.2502</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Địa chỉ:</span>&nbsp;
                                <span>38/2 Tay hoa</span>
                            </div>
                        </div>  
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDetail()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDetail(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default QLListTaiKhoan;