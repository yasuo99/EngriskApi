import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

class ThaoLuanPage extends Component {
    render() {
        return (
            <div>
               <Header></Header>
                <section id="thaoluan">
                    <div className="container pt-3">
                        <div className="row">
                            <div className="col-8">
                                <div className="row mt-5">
                                    <div className="col-8">
                                        <h3>Diễn Đàn Ngôn Ngữ Duolingo</h3>
                                    </div>
                                    <div className="col-4 text-right">
                                        <h3 className="btn btn-primary">ĐĂNG BÀI MỚI</h3>
                                    </div>
                                </div>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item"> <a href className="active nav-link" data-toggle="pill" data-target="#tabone"><i className="fa fa-book" /> ĐANG ĐƯỢC ƯU THÍCH</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href data-toggle="pill" data-target="#tabtwo"><i className="fa fa-star" /> MỚI </a> </li>
                                    <li className="nav-item"> <a href className="nav-link" data-toggle="pill" data-target="#tabthree"><i className="fa fa-bolt" /> ĐÃ THEO DÕI</a> </li>
                                </ul>
                                <div className="tab-content mt-3">
                                    <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><Link to="/thaoluanchitiet">Tìm hiểu về những loại bánh ngọt trên thế giới</Link></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tabthree" role="tabpanel">
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                                            <div className="col-md-8 pt-3">
                                                <h5><a href="#">Tìm hiểu về những loại bánh ngọt trên thế giới</a></h5>
                                                <p>3 ngày trước từ ChorlesVenn</p>
                                            </div>
                                            <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> 47</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-5">
                                <input className="form-control" type="text" placeholder="Tìm kiếm" aria-label="Search" />
                                <div className="theodoi mt-4">
                                    <div className="row pt-3">
                                        <div className="col-8">
                                            <h4>Đang Theo Dõi:</h4>
                                        </div>
                                        <div className="col-4 pt-2"><a href="#">SỬA ĐỔI</a></div>
                                    </div>
                                    <div className="nd-theodoi mt-2">
                                        <img src="image/united-states.png" className="pr-3" />
                                        <a href="#">Duolingo</a>
                                    </div>
                                    <div className="nd-theodoi mt-2">
                                        <img src="image/united-states.png" className="pr-3" />
                                        <a href="#">Duolingo</a>
                                    </div>
                                    <div className="nd-theodoi mt-2">
                                        <img src="image/united-states.png" className="pr-3" />
                                        <a href="#">Duolingo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default ThaoLuanPage;


