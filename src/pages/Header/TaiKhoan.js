import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {logOut} from '../../actions/authActions';

const TaiKhoan = ({status,account}) => {
  const dispatch = useDispatch();
  const dispatchLogout = () => dispatch(logOut())
    if(status === true){
        return(
            <div>
                <div className="thongbao">
                          <div className="row mt-2">
                            <div className="col-2"><img src="/image/gem.png" className="pl-2" /></div>
                            <div className="col-10">
                              <p className="pl-2">Bạn nhận được phần thưởng là 10 lingot vì giữ được 7 ngày steak</p>
                            </div>
                          </div>
                        </div>
                        <div className="thongbao pt-2 pl-2">
                          <h5>Tài khoản</h5>
                        </div>
                        <div className="taikhoan">
                          <Link className="dropdown-item" to="/hoso">Hồ sơ của bạn</Link>
                        </div>
                        <div className="taikhoan">
                          <Link className="dropdown-item" to="/caidattaikhoan">Cài đặt</Link>
                        </div>
                        <div className="taikhoan">
                          <Link className="dropdown-item" to="#">Plus miễn phí</Link>
                        </div>
                        <div className="taikhoan">
                          <Link className="dropdown-item" to="#">Hỗ trợ</Link>
                        </div>
                        <div className="taikhoan">
                          <button className="dropdown-item" onClick={dispatchLogout}>Đăng xuất</button>
                        </div>
                       
            </div>
        )
    }
    else {
        return(
            <div>
                <div className="thongbao">
                          <div className="row mt-2">
                            <div className="col-2"><img src="/image/gem.png" className="pl-2" /></div>
                            <div className="col-10">
                              <p className="pl-2">Bạn nhận được phần thưởng là 10 lingot vì giữ được 7 ngày steak</p>
                            </div>
                          </div>
                        </div>
                        <div className="thongbao pt-2 pl-2">
                          <h5>Tài khoản</h5>
                        </div>
                        <div className="taikhoan">
                          <Link className="dropdown-item" to="/hoso">Tạo hồ sơ</Link>
                        </div>
                        <div className="taikhoan">
                          <Link className="dropdown-item" to="/caidattaikhoan">Cài đặt</Link>
                        </div>
                        <div className="taikhoan">
                          <Link className="dropdown-item" to="#">Hỗ trợ</Link>
                        </div>
                        <div className="taikhoan">
                          <Link className="dropdown-item" to="/signin">Đăng Nhập</Link>
                        </div>
                       
            </div>
        )
    }
}
export default TaiKhoan;