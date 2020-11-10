import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
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

        <main>
          <div className="container">
            <div className="row">
              <div id="trangchu" className="col-8">
                <div className="giaidoan1">
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-tim" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 1</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-tim" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 2</h5>
                        </a>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-tim" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 3</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-vang ml-4">
                        <div className="vongtron-vang" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 4</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 5</h5>
                        </a>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 5</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <a href="#">
                          <img src="image/hamburger.png" className="img-item" />
                          <h5 className="tieude">Món ăn</h5>
                        </a>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <a href="#">
                          <img src="image/fish.png" className="img-item" />
                          <h5 className="tieude">Động vật</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="kechan mt-5 pt-5">
                    <div className="row">
                      <div className="col-4 offset-1 duongke" />
                      <div className="col-2"><img src="image/vuongniem.svg" className="img-vuongniem" />
                        <h3 className="nd">1</h3>
                      </div>
                      <div className="col-4 duongke" />
                    </div>
                  </div>
                </div>
                <div className="giaidoan2">
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Các sự vật</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Sở hữu</h5>
                        </a>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <a href="#">
                          <img src="image/bussiness-man.png" className="img-item" />
                          <h5 className="tieude">Con người</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/high-heels.png" className="img-item" />
                          <h5 className="tieude">Trang phục</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Hiện tại 1</h5>
                        </a>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/rgb.png" className="img-item" />
                          <h5 className="tieude">Màu sắc</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-vang" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Câu hỏi</h5>
                        </a>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-vang ml-4">
                        <div className="vongtron-vang" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Từ nối</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="kechan mt-5 pt-5">
                    <div className="row">
                      <div className="col-4 offset-1 duongke" />
                      <div className="col-2"><img src="image/vuongniem.svg" className="img-vuongniem" />
                        <h3 className="nd">2</h3>
                      </div>
                      <div className="col-4 duongke" />
                    </div>
                  </div>
                </div>
                <div className="giaidoan3">
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/map.png" className="img-item" />
                          <h5 className="tieude">Vị trí</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/deadline.png" className="img-item" />
                          <h5 className="tieude">Thời gian</h5>
                        </a>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/teamwork.png" className="img-item" />
                          <h5 className="tieude">Gia đình</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-vang ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Công việc</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-vang" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Hiện tại 2</h5>
                        </a>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Mô tả</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <a href="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Phó từ</h5>
                        </a>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <a href>
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Nơi chốn</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <div class="kechan mt-5 pt-5">
            <div class="row">
              <div class="col-4 offset-1 duongke"></div>
              <div class="col-2"><img src="image/vuongniem.svg" class="img-vuongniem">
                <h3 class="nd">3</h3>
              </div>
              <div class="col-4 duongke"></div>
            </div>
          </div> */}
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
        </main>
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

    )
  }
}
export default HomePage;