import React from "react";
import { Link } from "react-router-dom";

const Footer = ()=>{
    return(
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8 mt-5">
                <div className="row kechan pt-3">
                  <div className="col-2">
                    <h6><Link to="#">GIỚI THIỆU</Link></h6>
                  </div>
                  <div className="col-2">
                    <h6><Link to="#">HỌC ĐƯỜNG</Link></h6>
                  </div>
                  <div className="col-2">
                    <h6><Link to="#">ỨNG DỤNG</Link></h6>
                  </div>
                  <div className="col-2">
                    <h6><Link to="#">TRỢ GIÚP</Link></h6>
                  </div>
                  <div className="col-2">
                    <h6><Link to="#">NỘI QUY</Link></h6>
                  </div>
                  <div className="col-2">
                    <h6><Link to="#">CÔNG VIỆC</Link></h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 offset-2 text-right">
                    <h6><Link to="#">ĐIỀU KHOẢN</Link></h6>
                  </div>
                  <div className="col-4">
                    <h6><Link to="#">QUYỀN RIÊNG TƯ</Link></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
   
    )
}
export default Footer;