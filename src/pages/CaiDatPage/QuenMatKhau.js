import React, { Component } from 'react';
import { Link } from "react-browser-router";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
class QuenMatKhau extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="quenmatkhau">
                            <div className="container">
                                {/* Outer Row */}
                                <div className="row justify-content-center">
                                    <div className="col-xl-10 col-lg-12 col-md-9">
                                        <div className="card o-hidden border-0 shadow-lg my-5">
                                            <div className="card-body p-0">
                                                <div className="row">
                                                    <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                                    <div className="col-lg-6">
                                                        <div className="p-5">
                                                            <div className="text-center">
                                                                <h1 className="h4 text-gray-900 mb-2">Quên mật khẩu?</h1>
                                                                <p className="mb-4">Bạn chỉ cần nhập địa chỉ email của bạn dưới đây và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn!</p>
                                                            </div>
                                                            <form className="user">
                                                                <div className="form-group">
                                                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Nhập email..." />
                                                                </div>
                                                                <Link to="/signin" className="btn btn-primary btn-user btn-block">
                                                                    Đặt lại mật khẩu
                          </Link>
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

export default QuenMatKhau;
