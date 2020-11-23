import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class SubMenu extends Component{
    render(){
        return(
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="#">
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fa fa-smile-o" />
              </div>
              <div className="sidebar-brand-text mx-3">SB Admin</div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
              <Link className="nav-link" to="#">
                <i className="fa fa-fw fa-tachometer-alt" />
                <span>Dashboard</span></Link>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
              Interface
            </div>
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
            <li className="nav-item">
              <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <i className="fa fa-fw fa-wrench" />
                <span>Content</span>
              </Link>
              <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Quản lý nội dung:</h6>
                  <Link className="collapse-item" to="#">Tài khoản</Link>
                  <Link className="collapse-item" to="#">Bài tập</Link>
                  <Link className="collapse-item" to="#">Thông báo</Link>
                  <Link className="collapse-item" to="#">Từ vựng</Link>
                  <Link className="collapse-item" to="#">Ví dụ</Link>
                  <Link className="collapse-item" to="#">Lịch sử nạp</Link>
                  <Link className="collapse-item" to="#">Báo lỗi</Link>
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
          </ul>
  
        )
    }
}
export default SubMenu;