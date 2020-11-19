import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                        <div className="chude-binhluan">
                            <div className="row mt-5">
                                <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src="image/imag-01.jpg" /></div>
                                <div className="col-md-11 pt-3">
                                    <h4>Tìm hiểu về những loại bánh ngọt trên thế giới</h4>
                                    <a href="#">Lap</a>
                                    <p className="mt-3">Mong rằng doulingo có chức năng call giao tiếp để mọi người cùng luyện nói tiếng
                        anh với nhau</p>
                                </div>
                                <div className="baocao">
                                    <a href="#" className="mr-3">BÁO CÁO</a>
                                    <a href="#">TẶNG LINGOT</a>
                                </div>
                            </div>
                        </div>
                        <div className="binhluan">
                            <div className="row mt-5">
                                <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src="image/imag-01.jpg" /></div>
                                <div className="col-md-11">
                                    <textarea rows={4} cols={140} placeholder="Gửi một bình luận mới" defaultValue={""} />
                                    <button type="button" className="btn btn-primary mr-3 mt-2">ĐĂNG</button>
                                    <button type="button" className="btn btn-primary mt-2">HỦY</button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5 kechan">
                            <div className="col-6">
                                <h3>1 NHẬN XÉT</h3>
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
                            <div className="row mt-3 kechan">
                                <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src="image/imag-01.jpg" /></div>
                                <div className="col-md-11 pt-3">
                                    <a href="#">Lap</a>
                                    <p className="mt-3">Mong rằng doulingo có chức năng call giao tiếp để mọi người cùng luyện nói tiếng
                        anh với nhau</p>
                                </div>
                                <div className="baocao">
                                    <a href="#" className="mr-3">TRẢ LỜI</a>
                                    <a href="#" className="mr-3">BÁO CÁO</a>
                                    <a href="#">TẶNG LINGOT</a>
                                </div>
                            </div>
                            <div className="row mt-3 kechan">
                                <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src="image/imag-01.jpg" /></div>
                                <div className="col-md-11 pt-3">
                                    <a href="#">Lap</a>
                                    <p className="mt-3">Mong rằng doulingo có chức năng call giao tiếp để mọi người cùng luyện nói tiếng
                        anh với nhau</p>
                                </div>
                                <div className="baocao">
                                    <a href="#" className="mr-3">TRẢ LỜI</a>
                                    <a href="#" className="mr-3">BÁO CÁO</a>
                                    <a href="#">TẶNG LINGOT</a>
                                </div>
                            </div>
                            <div className="row mt-3 kechan">
                                <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src="image/imag-01.jpg" /></div>
                                <div className="col-md-11 pt-3">
                                    <a href="#">Lap</a>
                                    <p className="mt-3">Mong rằng doulingo có chức năng call giao tiếp để mọi người cùng luyện nói tiếng
                        anh với nhau</p>
                                </div>
                                <div className="baocao">
                                    <a href="#" className="mr-3">TRẢ LỜI</a>
                                    <a href="#" className="mr-3">BÁO CÁO</a>
                                    <a href="#">TẶNG LINGOT</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
export default ThaoLuanChiTietPage;