import React, { Component } from "react";
import { Link } from "react-browser-router"
import Modal from "../modal/Modal";
class QLTaiKhoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value,
          });
    }
    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modal: false
        });
    }
    render() {
        return (
            <tr>
                <td>NguyenLap</td>
                <td>Lap@gmail.com</td>
                <td>Nguyễn Thanh Lập</td>
                <td>03.3939.2502</td>
                
                <td>
                    <a href="javascript:;" className="btn btn-success mr-2" onClick={e => this.modalOpen(e)} ><i className="fa fa-info" /></a>
                    <a href="#" className="btn btn-primary mr-2" ><i className="fa fa-expeditedssl" /></a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                    <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                        <h2 className="text-center text-primary">Thông tin chi tiết tài khoản</h2>
                        <hr className="sidebar-divider my-0" />
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
                                <span>03.3939.3502</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Giới tính:</span>&nbsp;
                                <span>Nam</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Địa chỉ:</span>&nbsp;
                                <span>38/2 Tây Hòa phường Phước Long A quận 9 Tp.HCM</span>
                            </div>
                        </div>
                    </Modal>
                </td>
            </tr>
        );
    }
}
export default QLTaiKhoan;