import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appendScript } from "../../config/appendScript";
import $ from 'jquery';
import { useDispatch, useSelector } from "react-redux";
import { toggleSidenav } from "../../actions/sidenavAction";
import { AiOutlineBarChart } from 'react-icons/ai'
import { FaRoute } from 'react-icons/fa'
import { MenuLevelOne, MenuLevelTwo } from "../../constants/MenuLevel";
const SubMenu = () => {
  const [toggleSidebar, setToggleSideBar] = useState(false);
  const { collapse } = useSelector(state => state.sidenav)
  const {levelOne, levelTwo} = useSelector(state => state.sidenav);
  const dispatch = useDispatch();
  function toggle() {
    console.log(!collapse);
    dispatch(toggleSidenav(collapse))
  }
  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${collapse ? "toggled" : ""}`}
      id="accordionSidebar" style={{ width: '7.5rem !important' }}
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/admin"
        onClick={() => dispatch({type: 'SelectLevelOne', data: MenuLevelOne.ADMIN})}
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fa fa-smile-o" />
        </div>
        <div className="sidebar-brand-text mx-3">Engrisk</div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Tài nguyên</div>
      <li className="nav-item">
        <Link
          className="nav-link collapsed active"
          to="#"
          data-toggle="collapse"
          data-target="#collapseUtilities1"
          aria-expanded="true"
          aria-controls="collapseUtilities"
          onClick={() => dispatch({type: 'SelectLevelOne', data: MenuLevelOne.CONTENT})}
        >
          <i className="fa fa-fw fa-database" />
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
            <Link className={`collapse-item ${levelTwo == MenuLevelTwo.VOCABULARY ? 'active' : ''}`} to="/admin/quan-ly-tu-vung" onClick={() => dispatch({type: 'SelectLevelTwo', data: MenuLevelTwo.VOCABULARY})}>
              Từ vựng
            </Link>
            <Link className={`collapse-item ${levelTwo == MenuLevelTwo.CATEGORY ? 'active' : ''}`} to="/admin/quan-ly-nhom-tu" onClick={() => dispatch({type: 'SelectLevelTwo', data: MenuLevelTwo.CATEGORY})}>
              Nhóm từ
            </Link>
            <Link className={`collapse-item ${levelTwo == MenuLevelTwo.TAG ? 'active' : ''}`} to="/admin/quan-ly-tag" onClick={() => dispatch({type: 'SelectLevelTwo', data: MenuLevelTwo.TAG})}>
              Tag
            </Link>
            <Link className={`collapse-item ${levelTwo == MenuLevelTwo.POST ? 'active' : ''}`} to="/admin/quan-ly-bai-viet" onClick={() => dispatch({type: 'SelectLevelTwo', data: MenuLevelTwo.POST})}>
              Bài viết
            </Link>
            <Link className={`collapse-item ${levelTwo == MenuLevelTwo.QUESTIONBANK ? 'active' : ''}`} to="/admin/quan-ly-cau-hoi" onClick={() => dispatch({type: 'SelectLevelTwo', data: MenuLevelTwo.QUESTIONBANK})}>
              Ngân hàng câu hỏi
            </Link>
            <Link className={`collapse-item ${levelTwo == MenuLevelTwo.CERTIFICATE ? 'active' : ''}`} to="/admin/quan-ly-chung-chi" onClick={() => dispatch({type: 'SelectLevelTwo', data: MenuLevelTwo.CERTIFICATE})}>
              Chứng chỉ
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link to="/admin/quan-ly-exam" className="nav-link collapsed" >
          <i className="fa fa-fw fa-folder"></i>
          <span>Exams</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/quan-ly-quiz" className="nav-link collapsed" >
          <i className="fa fa-fw fa-folder"></i>
          <span>Quiz</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/quan-ly-bai-hoc" className="nav-link collapsed">
          <i className="fa fa-fw fa-folder"></i>
          <span>Bài học</span>
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseRoutes" aria-expanded="true" aria-controls="collapseRoutes">
          <i className="fa fa-fw fa-folder"></i>
          <span>Lộ trình học</span>
        </a>
        <div id="collapseRoutes" className="collapse" aria-labelledby="headingRoutes" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý:</h6>
            <Link className="collapse-item" to="/admin/quan-ly-lo-trinh">Danh sách</Link>
            <div className="collapse-divider"></div>
            <h6 className="collapse-header">Phân tích:</h6>
            <Link className="collapse-item" to="/admin/quan-ly-lo-trinh/overview">Tổng quan</Link>
          </div>
        </div>
      </li>
      <hr className="sidebar-divider"></hr>

      <div className="sidebar-heading">
        Quản trị
      </div>
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
            <h6 className="collapse-header">Kiểm duyệt nội dung:</h6>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/bai-viet-binh-luan">
              Post/Comment
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/the-ghi-nho">
              Thẻ nhớ
            </Link>
          </div>
        </div>
      </li>

      <div className="text-center d-none d-md-inline">
        <button onClick={() => toggle()}
          className={`rounded-circle border-0`}
          id="sidebarToggle"
        ></button>
      </div>
    </ul>)
}
export default SubMenu;
