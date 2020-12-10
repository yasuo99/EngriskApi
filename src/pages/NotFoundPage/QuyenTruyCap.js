import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class QuyenTruyCap extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="trangloitruycap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 pl-5">
                                        <h1 className="title-loitruycap">Bạn cần phải có quyền truy cập</h1>
                                        <p className="text-loitruycap mb-5 mt-2">Hãy yêu cầu quyền truy cập hoặc chuyển qua tài khoản khác có quyền truy cập</p>
                                        <button className="btn btn-primary mt-5" type="button">Trở lại</button>
                                    </div>
                                    <div className="col-6 text-center">
                                        <img src="/image/lock.png" />
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
export default QuyenTruyCap;