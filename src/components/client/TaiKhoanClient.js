import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from '../../actions/authActions';

const TaiKhoanClient = ({ status,account}) => {
    const dispatch = useDispatch();
    const dispatchLogout = () => dispatch(logOut())
    if (status === true) {
        return (
            <li className="nav-item dropdown no-arrow">
                <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{account.username}</span>
                    <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                </Link>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <Link className="dropdown-item" to="#">Hồ sơ của bạn</Link>
                    <Link className="dropdown-item" to="#">Cài đặt</Link>
                    <Link className="dropdown-item" to="#">Hỗ trợ</Link>
                    <div className="dropdown-divider" />
                    <Link className="dropdown-item" to="#" onClick={dispatchLogout}>Đăng xuất</Link>
                </div>
            </li>)
    }
    else {
        return (
            <li className="nav-item dropdown no-arrow">
            <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
              <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
            </Link>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <Link className="dropdown-item" to="#">Hồ sơ của bạn</Link>
              <Link className="dropdown-item" to="#">Cài đặt</Link>
              <Link className="dropdown-item" to="#">Hỗ trợ</Link>
              <div className="dropdown-divider" />
              <Link className="dropdown-item" to="/signin">Đăng nhập</Link>
            </div>
          </li>    )
    }
}
export default TaiKhoanClient;