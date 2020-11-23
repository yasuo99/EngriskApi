import React, {Component} from "react"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FormTaiKhoan from "../../components/caidat/FormTaiKhoan";

class CaiDatTaiKhoan extends Component{
    render(){
        return(
            <div>
            <Header></Header>
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
        )
    }
}
export default CaiDatTaiKhoan;