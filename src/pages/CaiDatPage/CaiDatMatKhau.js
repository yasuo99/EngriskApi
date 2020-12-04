import React, { Component } from "react"
import FormMatKhau from "../../components/caidat/FormMatKhau";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class CaiDatMatKhau extends Component {
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
                  <FormMatKhau></FormMatKhau>
                  <div className="col-4 mt-5">
                    <div className="caidat-matkhau">
                      <div className="ml-3 mt-3">
                        <img src="image/user (1).png" className="float-left mr-2" />
                        <h3 className="mt-2 text-primary">Thanh Lập</h3>
                        <a href="hoso.html">XEM HỒ SƠ CỦA BẠN</a>
                      </div>
                      <div className="chucnang">
                        <div className="nd-chucnang mt-2 ">
                          <a href="caidattaikhoan.html">Tài khoản</a>
                        </div>
                        <div className="nd-chucnang mt-2">
                          <a href="#">Hồ sơ</a>
                        </div>
                        <div className="nd-chucnang mt-2 bg-active">
                          <a href="#" className="text-active">Mật khẩu</a>
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
export default CaiDatMatKhau;