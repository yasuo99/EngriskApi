import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BinhLuanPost from '../../components/thaoluan/BinhLuanPost';
import ContentPost from '../../components/thaoluan/ContentPost';
import PhanHoiPost from '../../components/thaoluan/PhanHoiPost';
import Header from '../Header/Header';

class ThaoLuanChiTietPage extends Component {
    render() {
        return (
            <div>
               <Header></Header>
                <section id="chitietthaoluan">
                    <div className="container pt-3">
                        <div className="row kechan">
                            <div className="col-6 diendan mt-5 mb-5">
                                <a href="#">DIỄN ĐÀN</a> <i className="fa fa-angle-right" /> <a href="#">CHỦ ĐỀ DUOLINGO</a>
                            </div>
                            <div className="col-6 theodoi text-right mt-4"><button type="button" className="btn btn-light">THEO DÕI THẢO
                      LUẬN</button></div>
                        </div>
                        <ContentPost></ContentPost>
                        <BinhLuanPost></BinhLuanPost>
                        <div className="row mt-5 kechan">
                            <div className="col-6">
                                <h3>NHẬN XÉT</h3>
                            </div>
                            <div className="col-6 sapxep">
                                <div className="navbar navbar-expand-lg navbar-light">
                                    <div className="container">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu-sapxep"> </button>
                                        <div className="collapse navbar-collapse" id="menu-sapxep">
                                            <ul>
                                                <li className="nav-item dropdown"> <a className="nav-link " href="#" data-toggle="dropdown">SẮP XẾP THEO BÀI ĐĂNG <i className="fa fa-chevron-down" /></a>
                                                    <div className="dropdown-menu sub-sapxep"> <a className="dropdown-item" href="#">Top bài
                                  đăng</a> <a className="dropdown-item" href="#">Mới nhất</a> <a className="dropdown-item" href="#">Cũ nhất</a></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="phanhoi-binhluan">
                           <PhanHoiPost></PhanHoiPost>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
export default ThaoLuanChiTietPage;