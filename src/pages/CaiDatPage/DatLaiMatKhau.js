import React, { Component } from 'react';
import { Link } from "react-browser-router";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { Button, Modal } from 'react-bootstrap'
class DatLaiMatKhau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfor: false,
        };
    }
    modalOpen() {
        this.setState({ modalInfor: true });
    }
    modalClose() {
        this.setState({
            modalInfor: false
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
                                                                <Modal show={this.state.modalInfor}>
                                                                    <Modal.Header closeButton onClick={() => this.modalClose()}>
                                                                        <Modal.Title> <img src="/image/check-mark.png"></img> Chúc mừng bạn đã thay đổi mật khẩu thành công</Modal.Title>
                                                                    </Modal.Header>

                                                                    <Modal.Footer>
                                                                        <Button variant="secondary" onClick={() => this.modalClose()}>Trở lại</Button>
                                                                    </Modal.Footer>
                                                                </Modal>

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
