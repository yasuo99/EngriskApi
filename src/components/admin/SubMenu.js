import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appendScript } from "../../config/appendScript";
import $ from 'jquery'; 
const SubMenu = () => {
  const [toggleSidebar, setToggleSideBar] = useState(false);
  function toggle() {
    setToggleSideBar(!toggleSidebar)
  }
  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggleSidebar ? "toggled" : ""}`}
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="#"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fa fa-smile-o" />
        </div>
        <div className="sidebar-brand-text mx-3">SB Admin</div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Interface</div>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseUtilities1"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fa fa-fw fa-cog" />
          <span>Nội dung</span>
        </Link>
        <div
          id="collapseUtilities1"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý nội dung:</h6>
            <Link className="collapse-item" to="/admin/quan-ly-tu-vung">
              Từ vựng
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-nhom-tu">
              Nhóm từ
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-vi-du">
              Ví dụ
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-quiz-exam">
              Quiz/Exam
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-bai-hoc">
              Bài học
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-lo-trinh">
              Lộ trình học
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fa fa-fw fa-wrench" />
          <span>Quản trị</span>
        </Link>
        <div
          id="collapseUtilities"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý nội dung:</h6>
            <Link className="collapse-item" to="/admin/quan-ly-thong-bao">
              Thông báo
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-tai-khoan">
              Tài khoản
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-phan-quyen">
              Phân quyền
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-bang-diem">
              Quy đổi điểm
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseCensor"
          aria-expanded="true"
          aria-controls="collapseCensor"
        >
          <i className="fa fa-fw fa-wrench" />
          <span>Kiểm duyệt</span>
        </Link>
        <div
          id="collapseCensor"
          className="collapse"
          aria-labelledby="headingCensor"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý nội dung:</h6>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/quiz-exam">
              Quiz/Exam
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/bai-viet-binh-luan">
              Post/Comment
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/the-ghi-nho">
              Thẻ nhớ
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/lo-trinh">
              Lộ trình học
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/dong-gop">
              Đóng góp
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fa fa-fw fa-cog" />
          <span>Giao diện</span>
        </Link>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Tùy chỉnh giao diện:</h6>
            <Link className="collapse-item" to="#">
              Banner
            </Link>
            <Link className="collapse-item" to="#">
              Footer
            </Link>
          </div>
        </div>
      </li>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Addons</div>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i className="fa fa-fw fa-folder" />
          <span>Trang</span>
        </Link>
        <div
          id="collapsePages"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="#">
              Trang 404
            </Link>
            <Link className="collapse-item" to="#">
              Trang trống
            </Link>
            <Link className="collapse-item" to="#">
              Trang lỗi
            </Link>
          </div>
        </div>
      </li>
      <div className="text-center d-none d-md-inline">
        <button onClick={() => toggle()}
          className={`rounded-circle border-0 fa ${toggleSidebar ? 'fa-chevron-right text-light' : 'fa-chevron-left text-light'}`}
          id="sidebarToggle"
        ></button>
      </div>
    </ul>)
}
export default SubMenu;
