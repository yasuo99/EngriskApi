import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ThaoLuanPage extends Component {
    render() {
        return (
            <div>
                <section id="menu-chinh">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu"> </button>
                            <div className="collapse navbar-collapse" id="menu">
                                <ul className="navbar-nav">
                                    <li className="nav-item active"> <Link className="nav-link" to="/"><img src="image/shooting-stars.png" className="pr-3" />HỌC</Link> </li>
                                    <li className="nav-item ml-5"> <Link className="nav-link" to="/thaoluan"><img src="image/book.png" className="pr-3" />
                          THẢO LUẬN</Link></li>
                                    <li className="nav-item ml-5"> <Link className="nav-link" to="/cuahang"><img src="image/shop.png" className="pr-3" />
                          CỬA HÀNG</Link></li>
                                    <li className="nav-item dropdown ml-5"> <Link className="nav-link " to="#" data-toggle="dropdown"><img src="image/more.png" className="pr-3" /> XEM THÊM</Link>
                                        <div className="dropdown-menu sub1"> <Link className="dropdown-item" to="/tudien"><img src="image/data.png" className="mr-5" />TỪ ĐIỂN</Link> <Link className="dropdown-item" to="/tuvung"><img src="image/dictionary.png" className="mr-5" /> TỪ VỰNG</Link> </div>
                                    </li>
                                    <li className="nav-item dropdown ml-5 pl-5"> <Link className="nav-link " to="#" data-toggle="dropdown"><img src="image/gem.png" /></Link>
                                        <div className="dropdown-menu">
                                            <div className="row sub2">
                                                <div className="col-4"><img src="image/chest.png" /></div>
                                                <div className="col-8">
                                                    <h5>Lingots</h5>
                                                    <p>Bạn có 96 Lingots</p>
                                                    <Link to="/cuahang">ĐẾN CỬA HÀNG</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown ml-3"> <Link className="nav-link " to="#" data-toggle="dropdown"><img src="image/user.png" /></Link>
                                        <div className="dropdown-menu sub3">
                                            <div className="thongbao">
                                                <div className="row pt-2">
                                                    <div className="col-6">
                                                        <h5 className="pl-2">Thông báo</h5>
                                                    </div>
                                                    <div className="col-6"><a href="#" className="text-right">
                                                        <h5 className="pr-2">Xem tất cả</h5>
                                                    </a></div>
                                                </div>
                                            </div>
                                            <div className="thongbao">
                                                <div className="row mt-2">
                                                    <div className="col-2"> <img src="image/gem.png" className="pl-2" /></div>
                                                    <div className="col-10">
                                                        <p className="pl-2">Bạn nhận được phần thưởng là 10 lingot vì giữ được 7 ngày steak</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="thongbao">
                                                <div className="row mt-2">
                                                    <div className="col-2"><img src="image/gem.png" className="pl-2" /></div>
                                                    <div className="col-10">
                                                        <p className="pl-2">Bạn nhận được phần thưởng là 10 lingot vì giữ được 7 ngày steak</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="thongbao pt-2 pl-2">
                                                <h5>Tài khoản</h5>
                                            </div>
                                            <div className="taikhoan">
                                                <a className="dropdown-item" href="#">Hồ sơ của bạn</a>
                                            </div>
                                            <div className="taikhoan">
                                                <a className="dropdown-item" href="#">Cài đặt</a>
                                            </div>
                                            <div className="taikhoan">
                                                <a className="dropdown-item" href="#">Plus miễn phí</a>
                                            </div>
                                            <div className="taikhoan">
                                                <a className="dropdown-item" href="#">Hỗ trợ</a>
                                            </div>
                                            <div className="taikhoan">
                                                <a className="dropdown-item" href="#">Đăng xuất</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </section>
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


