import React, { Component } from "react"
import FormTaiKhoan from "../../components/caidat/FormTaiKhoan";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
class CaiDatTaiKhoan extends Component {
  render() {
    return (
      <div id="wrapper">
        <SubMenuClient></SubMenuClient>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <HeaderClient></HeaderClient>
            <main id="caidat">
              <div className="container">
                <div className="row">
                  <FormTaiKhoan></FormTaiKhoan>
                  <div className="col-4 mt-5">
                    <div className="caidat-taikhoan">
                      <div className="ml-3 mt-3">
                        <img src="image/user (1).png" className="float-left mr-2" />
                        <h3 className="mt-2 text-primary">Thanh Lập</h3>
                        <a href="hoso.html">XEM HỒ SƠ CỦA BẠN</a>
                      </div>
                      <div className="chucnang">
                        <div className="nd-chucnang mt-2 bg-active">
                          <a href="caidattaikhoan.html" className="text-active">Tài khoản</a>
                        </div>
                        <div className="nd-chucnang mt-2">
                          <a href="#">Hồ sơ</a>
                        </div>
                        <div className="nd-chucnang mt-2">
                          <a href="caidatmatkhau.html">Mật khẩu</a>
                        </div>
                        <div className="nd-chucnang mt-2">
                          <a href="#">Thông báo</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Footer></Footer>
          </div>
        </div>

      </div>
    )
  }
}
export default CaiDatTaiKhoan;