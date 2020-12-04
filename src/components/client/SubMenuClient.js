import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {appendScript} from '../../config/appendScript'

class SubMenuClient extends Component {
  componentDidMount () {
    appendScript("/js/sb-admin-2.min.js");
}
  render() {
    return (
        <div id="subMenu">
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          <li className="nav-item">
            <Link className="nav-link text-center" to="/home">
              <img src="/image/world.png" className="mr-3"/>
              <span>ENGLISH</span>
            </Link>
          </li>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item">
            <Link className="nav-link" to="/flashcard">
              <img src="/image/shooting-stars.png" className="mr-2"/>
              <span>Học</span></Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="nav-item">
            <Link className="nav-link" to="/thao-luan">
              <img src="/image/book.png" className="mr-2"/>
              <span>Thảo luận</span></Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="nav-item">
            <Link className="nav-link" to="/tu-dien">
              <img src="/image/data.png" className="mr-2"/>
              <span>Từ điển</span></Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="nav-item">
            <Link className="nav-link" to="/tu-vung">
              <img src="/image/dictionary.png" className="mr-2"/>
              <span>Từ vựng</span></Link>
          </li>
          <div className="text-center d-none d-md-inline mt-5">
            <button className="rounded-circle border-0 fa fa-chevron-right " id="sidebarToggle" />
          </div>
        </ul>
      </div>
    )
  }
}
export default SubMenuClient;