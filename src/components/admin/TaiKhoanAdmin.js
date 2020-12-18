import React, { Component } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { logout } from '../../actions/authActions';
class TaiKhoanAdmin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="nav-item dropdown no-arrow">
        <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.props.account.username}</span>
          <img className="img-profile rounded-circle" src={this.props.account.photoUrl} />
        </Link>
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <Link className="dropdown-item" to="#">
            <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Thông Tin Cá Nhân
              </Link>
          <Link className="dropdown-item" to="#">
            <i className="fa fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                Cài Đặt
              </Link>
          <Link className="dropdown-item" to="#">
            <i className="fa fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </Link>
          <div className="dropdown-divider" />
          <Link className="dropdown-item" to="#" onClick={this.props.logout}>
            <i className="fa fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Đăng Xuất
              </Link>
        </div>
      </li>

    )
  }
}
const mapStateToProps = (state) =>{
  const {isLoggedIn, account} = state.auth;
  return{
    isLoggedIn: isLoggedIn,
    account: account
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaiKhoanAdmin) ;