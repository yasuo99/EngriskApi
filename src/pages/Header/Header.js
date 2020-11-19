import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
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

    )
}
export default Header;