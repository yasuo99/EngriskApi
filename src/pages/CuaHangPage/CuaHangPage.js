import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CuaHangPage extends Component {
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
                <section id="cuahang">
                    <div className="container">
                        <div className="row">
                            <div className="col-8 mt-5">
                                <div className="duolingoPlus">
                                    <div className="row">
                                        <div className="col-8">
                                            <h2 className="duolingo">duolingo</h2>
                                            <h4 className="plus">PLUS</h4>
                                            <div className="clearfix" />
                                            <p className="nd-duolingo">Gỡ bỏ quảng cáo, tải các bài học trên thiết bị di động, nhận lần khôi phục streak
                          miễn phí hàng tháng và hỗ trợ sứ mệnh của chúng tôi.</p>
                                            <button type="button" className="btn btn-light">THỬ MIỄN PHÍ</button>
                                        </div>
                                        <div className="col-4"><img src="image/owl.png" className="img-duolingo" /></div>
                                    </div>
                                </div>
                                <div className="tangsucmanh mt-5">
                                    <h3>Tăng sức mạnh</h3>
                                    <div className="kechan" />
                                    <div className="row">
                                        <div className="col-2"><img src="image/snowman.png" className="img-fluid" /></div>
                                        <div className="col-6">
                                            <h5>Streak Freeze</h5>
                                            <p>Streak Freeze cho phép bạn giữ nguyên streak trong một ngày bạn không có hoạt động nào.</p>
                                        </div>
                                        <div className="col-4"><button type="button" className="btn btn-light">MUA VỚI GIÁ: <img src="image/crystal.png" />
                          10</button></div>
                                    </div>
                                    <div className="kechan" />
                                    <div className="row">
                                        <div className="col-2"><img src="image/calendar.png" className="img-fluid" /></div>
                                        <div className="col-6">
                                            <h5>Gấp đôi hoặc Mất hết</h5>
                                            <p>Cược 5 lingot và nhận về gấp đôi nếu bạn duy trì được 7 ngày streak.</p>
                                        </div>
                                        <div className="col-4"><button type="button" className="btn btn-light">MUA VỚI GIÁ: <img src="image/crystal.png" />
                          10</button></div>
                                    </div>
                                </div>
                                <div className="luyentap mt-5">
                                    <h3>Luyện Tập</h3>
                                    <div className="kechan" />
                                    <div className="row">
                                        <div className="col-2"><img src="image/clock.png" className="img-fluid" /></div>
                                        <div className="col-6">
                                            <h5>Streak Freeze</h5>
                                            <p>Streak Freeze cho phép bạn giữ nguyên streak trong một ngày bạn không có hoạt động nào.</p>
                                        </div>
                                        <div className="col-4"><button type="button" className="btn btn-light">MUA VỚI GIÁ: <img src="image/crystal.png" />
                          10</button></div>
                                    </div>
                                </div>
                                <h5 className="mt-5">Lingot là gì? <img src="image/crystal.png" /></h5>
                                <p className="lingot"><b>Lingot [ling-guht]</b> là tiền tệ ảo của Duolingo. Bạn càng học nhiều trên Duolingo, bạn
                    càng nhận được nhiều lingot và dùng để mua vật phẩm trong cửa hàng! Một số cách nhận được lingot:</p>
                                <div className="row">
                                    <div className="col-3">
                                        <p><b>Thăng cấp</b></p>
                                    </div>
                                    <div className="col-9">
                                        <p>Nhận được <b>1 lingot</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <p><b>Hoàn thành một kỹ năng.</b></p>
                                    </div>
                                    <div className="col-9">
                                        <p>Nhận được <b>2 lingot</b> khi hoàn tất một kĩ năng</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <p><b>10 ngày streak</b></p>
                                    </div>
                                    <div className="col-9">
                                        <p>Nhận được <b>1 lingot</b> cho mỗi 10 ngày streak (1 cho 10 ngày, 2 cho 20...)<br /><br />
                        Ghi chú: Người học sẽ không nhận được Lingot nếu thăng cấp hoặc hoàn tất các kĩ năng nếu dùng bài kiểm
                        tra rút ngắn.
                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-5">
                                <div className="giadauvang">
                                    <h3 className="mb-3 pl-3">Giải đấu Vàng</h3>
                                    <div className=" pl-3 mb-3"> <img src="image/bronze-medal.png" className="mr-3" /> <img src="image/silver-medal.png" className="mr-3" /> <img src="image/gold-medal.png" className="mr-3" /> </div>
                                    <div className="gachchan" />
                                    <div className="nd-xephang mt-5 p3-4"> <img src="image/turtle.png" className="img-xephang" />
                                        <p className="nd"> Hoàn thành một khóa học để tham gia xếp hạng tuần</p>
                                    </div>
                                </div>
                                <div className="banbe">
                                    <div className="row">
                                        <div className="col-6">
                                            <h3>Bạn bè</h3>
                                        </div>
                                        <div className="col-6 text-right text3">
                                            <h5>TỔNG KN</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6"><a href="#"><img src="image/user.png" />
                                            <h5>Lap</h5>
                                        </a></div>
                                        <div className="col-6 text-right text3">
                                            <h5>1708 KN</h5>
                                        </div>
                                    </div>
                                    <div className="btn-banbe">
                                        <div className="btn1 btn-light">Tìm bạn bè trên facebook</div>
                                        <div className="btn2 btn-light">Mời</div>
                                        <div className="btn3 btn-light">Tìm kiếm</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-8 mt-5">
                                <div className="row kechan pt-5">
                                    <div className="col-2">
                                        <h6><a href="#">GIỚI THIỆU</a></h6>
                                    </div>
                                    <div className="col-2">
                                        <h6><a href="#">HỌC ĐƯỜNG</a></h6>
                                    </div>
                                    <div className="col-2">
                                        <h6><a href="#">ỨNG DỤNG</a></h6>
                                    </div>
                                    <div className="col-2">
                                        <h6><a href="#">TRỢ GIÚP</a></h6>
                                    </div>
                                    <div className="col-2">
                                        <h6><a href="#">NỘI QUY</a></h6>
                                    </div>
                                    <div className="col-2">
                                        <h6><a href="#">CÔNG VIỆC</a></h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 offset-2 text-right">
                                        <h6><a href="#">ĐIỀU KHOẢN</a></h6>
                                    </div>
                                    <div className="col-4">
                                        <h6><a href="#">QUYỀN RIÊNG TƯ</a></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
export default CuaHangPage;