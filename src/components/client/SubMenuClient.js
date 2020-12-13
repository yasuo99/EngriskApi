import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSidenav } from '../../actions/sidenavAction';
import { appendScript } from '../../config/appendScript'

class SubMenuClient extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this)
  }
  componentDidMount() {
    appendScript("/js/sb-admin-2.min.js");
  }
  toggle(){
    this.props.toggleSidenav(this.props.collapse);
  }
  render() {
    return (
      <div id="subMenu">
        <ul className={this.props.collapse ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"} id="accordionSidebar">
          <li className="nav-item">
            <Link className="nav-link text-center" to="/home">
              <img src="/image/world.png" className="mr-3" />
              <span>ENGLISH</span>
            </Link>
          </li>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item">
            <Link className="nav-link" to="/flashcard">
              <img src="/image/shooting-stars.png" className="mr-2" />
              <span>Học từ vựng</span></Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="nav-item">
            <Link className="nav-link" to="/exam">
              <img src="/image/test.png" className="mr-2" />
              <span>Exam</span></Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="nav-item">
            <Link className="nav-link" to="/thao-luan">
              <img src="/image/book.png" className="mr-2" />
              <span>Thảo luận</span></Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="nav-item">
            <Link className="nav-link" to="/tu-dien">
              <img src="/image/data.png" className="mr-2" />
              <span>Từ điển</span></Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="nav-item">
            <Link className="nav-link" to="/tu-vung">
              <img src="/image/dictionary.png" className="mr-2" />
              <span>Từ vựng</span></Link>
          </li>
          <div className="text-center d-none d-md-inline mt-5">
            <button className="rounded-circle border-0 fa fa-chevron-right " id="sidebarToggle" onClick={this.toggle}/>
          </div>
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const {collapse} = state.sidenav
  return {
    collapse: collapse
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidenav: (collapse) => dispatch(toggleSidenav(collapse))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SubMenuClient);