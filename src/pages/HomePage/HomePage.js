import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

class HomePage extends Component {
  render() {
    return (
      <div>

        <Header />
        <main>
          <div className="container">
            <div className="row">
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
                    <div className="col-6"><a to="#"><img src="image/user.png" />
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
              <div id="trangchu" className="col-8">
                <div className="giaidoan1">
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-tim" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 1</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-tim" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 2</h5>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-tim" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 3</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-vang ml-4">
                        <div className="vongtron-vang" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 4</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 5</h5>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Cơ bản 5</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <Link to="#">
                          <img src="image/hamburger.png" className="img-item" />
                          <h5 className="tieude">Món ăn</h5>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <Link to="#">
                          <img src="image/fish.png" className="img-item" />
                          <h5 className="tieude">Động vật</h5>
                        </Link>
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
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Các sự vật</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Sở hữu</h5>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <Link to="#">
                          <img src="image/bussiness-man.png" className="img-item" />
                          <h5 className="tieude">Con người</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/high-heels.png" className="img-item" />
                          <h5 className="tieude">Trang phục</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Hiện tại 1</h5>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/rgb.png" className="img-item" />
                          <h5 className="tieude">Màu sắc</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-vang" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Câu hỏi</h5>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-vang ml-4">
                        <div className="vongtron-vang" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Từ nối</h5>
                        </Link>
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
                        <Link to="#">
                          <img src="image/map.png" className="img-item" />
                          <h5 className="tieude">Vị trí</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/deadline.png" className="img-item" />
                          <h5 className="tieude">Thời gian</h5>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/teamwork.png" className="img-item" />
                          <h5 className="tieude">Gia đình</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-4 ">
                      <div className="nen-vang ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Công việc</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-vang" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Hiện tại 2</h5>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Mô tả</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4 offset-2">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhduong" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Phó từ</h5>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="nen-xam ml-4">
                        <div className="vongtron-xanhla" />
                        <Link to="#">
                          <img src="image/easter-egg.png" className="img-item" />
                          <h5 className="tieude">Nơi chốn</h5>
                        </Link>
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

    )
  }
}

export default HomePage;