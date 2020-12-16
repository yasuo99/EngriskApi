import React, { Component } from "react"
import FormMatKhau from "../../components/caidat/FormMatKhau";
import FormTaiKhoan from "../../components/caidat/FormTaiKhoan";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { Link } from "react-router-dom";
class CaiDatChung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      check: false,
    };
  }
  onClickTaiKhoan() {
    this.setState({ check: false });
  }
  onClickMatKhau() {
    this.setState({ check: true });
  }
  render() {
    var { isActive,check } = this.state;
    return (
      <div id="wrapper">
        <SubMenuClient></SubMenuClient>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <HeaderClient></HeaderClient>
            <main id="caidat">
              <div className="container">
                <div className="row">
            
                  {check=== true ? <FormMatKhau /> : <FormTaiKhoan />}
                  
                  <div className="col-4 mt-5">
                    <div className="caidat-matkhau">
                      <div className="ml-3 mt-3">
                        <img src="image/user (1).png" className="float-left mr-2" />
                        <h3 className="mt-2 text-primary">Thanh Lập</h3>
                        <Link to="/hoso">XEM HỒ SƠ CỦA BẠN</Link>
                      </div>
                      <div className="chucnang">
                        <div className={isActive === true ? "nd-chucnang mt-2 bg-active" : "nd-chucnang mt-2"}>
                          <Link to="#" onClick={e => this.onClickTaiKhoan(e)}>Tài khoản</Link>
                        </div>
                        <div className={isActive === true ? "nd-chucnang mt-2 bg-active" : "nd-chucnang mt-2"}  >
                          <Link to="#" onClick={e => this.onClickMatKhau(e)}>Mật khẩu</Link>
                        </div>
                        <div className={isActive === true ? "nd-chucnang mt-2 bg-active" : "nd-chucnang mt-2"}>
                          <Link to="/thongbao">Thông báo</Link>
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
export default CaiDatChung;