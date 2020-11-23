import React, {Component} from "react"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FormMatKhau from "../../components/caidat/FormMatKhau";

class CaiDatMatKhau extends Component{
    render(){
        return(
            <div>
            <Header></Header>
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
        )
    }
}
export default CaiDatMatKhau;