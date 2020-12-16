import React, { Component } from 'react';
import { Link } from "react-browser-router";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import ModalInfor from "../../components/modal/ModalInfor";
class DatLaiMatKhau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
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
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="quenmatkhau">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-xl-10 col-lg-12 col-md-9">
                                        <div className="card o-hidden border-0 shadow-lg my-5">
                                            <div className="card-body p-0">
                                                <div className="row">
                                                    <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                                    <div className="col-lg-6">
                                                        <div className="p-5">
                                                            <div className="text-center">
                                                                <h1 className="h4 text-gray-900 mb-2">Đặt lại mật khẩu</h1>
                                                            </div>
                                                            <form className="user">
                                                                <div className="form-group">
                                                                    <input type="password" className="form-control form-control-user" id="InputPassword" placeholder="Nhập mật khẩu..." />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="password" className="form-control form-control-user" id="InputConfirmPassword" placeholder="Xác nhận lại mật khẩu..." />
                                                                </div>
                                                                <button className="btn btn-primary btn-user btn-block" onClick={e => this.modalOpen(e)}>
                                                                    Lưu lại
                                                                </button>
                                                                <ModalInfor show={this.state.modal} handleClose={e => this.modalClose(e)}>
                                                                    <h3 className="title"> <img src="/image/check-mark.png"></img> Chúc mừng bạn đã thay đổi mật khẩu thành công</h3>
                                                                </ModalInfor>
                                                            </form>
                                                            <hr />
                                                            <div className="text-center">
                                                                <Link className="small" to="/signup">Tạo tài khoản</Link>
                                                            </div>
                                                            <div className="text-center">
                                                                <Link className="small" to="/signin">Bạn đã có sẵn một tài khoản? Đăng nhập</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <Footer></Footer>
                    </div>
                </div>

            </div>

        );
    }
}

export default DatLaiMatKhau;
