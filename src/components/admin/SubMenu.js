import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { appendScript } from '../../config/appendScript'

class SubMenu extends Component {
  componentDidMount() {
    appendScript("/js/sb-admin-2.min.js");
  }
  render() {
    return (
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="#">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fa fa-smile-o" />
          </div>
          <div className="sidebar-brand-text mx-3">SB Admin</div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">
          Interface
            </div>
            <li className="nav-item">
          <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities1" aria-expanded="true" aria-controls="collapseUtilities">
            <i className="fa fa-fw fa-wrench" />
            <span>Nội dung học tập</span>
          </Link>
          <div id="collapseUtilities1" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Quản lý nội dung:</h6>
              <Link className="collapse-item" to="/quanly-tailieu">Tài liệu</Link>
              <Link className="collapse-item" to="/quanly-tuvung">Từ vựng</Link>
              <Link className="collapse-item" to="/quanly-vidu">Ví dụ</Link>
              <Link className="collapse-item" to="/quanly-quiz_exam">Quiz/Exam</Link>
              <Link className="collapse-item" to="/quanly-section">Bài học</Link>

            </div>
          </div>
        </li>
     
        <li className="nav-item">
          <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
            <i className="fa fa-fw fa-wrench" />
            <span>Nội dung khác</span>
          </Link>
          <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Quản lý nội dung:</h6>
              <Link className="collapse-item" to="/quanly-thongbao">Thông báo</Link>
              <Link className="collapse-item" to="/quanly-taikhoan">Tài khoản</Link>
              <Link className="collapse-item" to="/quanly-phanquyen">Phân quyền</Link>
              <Link className="collapse-item" to="/quanly-bangdiem">Quy đổi điểm</Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fa fa-fw fa-cog" />
            <span>Giao diện</span>
          </Link>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Tùy chỉnh giao diện:</h6>
              <Link className="collapse-item" to="#">Banner</Link>
              <Link className="collapse-item" to="#">Footer</Link>
            </div>
          </div>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">
          Addons
            </div>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
            <i className="fa fa-fw fa-folder" />
            <span>Trang</span>
          </Link>
          <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="#">Trang 404</Link>
              <Link className="collapse-item" to="#">Trang trống</Link>
              <Link className="collapse-item" to="#">Trang lỗi</Link>
            </div>
          </div>
        </li>
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0 fa fa-chevron-right " id="sidebarToggle"></button>
        </div>
      </ul>

    )
  }
}
export default SubMenu;