import React from "react";

const Footer = ()=>{
    return(
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
   
    )
}
export default Footer;