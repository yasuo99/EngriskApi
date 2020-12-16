import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import ThongBao from '../../components/thongbao/ThongBao';
import Footer from '../Footer/Footer';

class DanhSachThongBao extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="danhsachthongbao">
                            <div className="container pt-3">
                                <h4 className="title">Danh sách thông báo</h4>
                                <div className="row mt-3">
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <ThongBao></ThongBao>
                                    </div>
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <ThongBao></ThongBao>
                                    </div>
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <ThongBao></ThongBao>
                                    </div>
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <ThongBao></ThongBao>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        );
    }
}
export default DanhSachThongBao;