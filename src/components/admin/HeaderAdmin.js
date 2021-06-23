import React, { Component } from "react"
import FormSearchAdmin from "./FormSearchAdmin";
import TaiKhoanAdmin from "./TaiKhoanAdmin";
import ThongBaoAdmin from "./ThongBaoAdmin";
import { connect } from "react-redux";
import { connection } from "../../signalR/createSignalRConnection";
import { HubConnectionState } from "@microsoft/signalr";
import { appendScript } from "../../config/appendScript";

class HeaderAdmin extends Component {
  constructor(props) {
    super(props)
    this.mounted = false
  }
  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      if (this.props.isLoggedIn) {
        if (connection.state == HubConnectionState.Disconnected) {
          connection.start();
        }
      }
    }
  }
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars" />
        </button>
        {/* <FormSearchAdmin></FormSearchAdmin> */}
        <ul className="navbar-nav ml-auto">
          <ThongBaoAdmin></ThongBaoAdmin>
          <div className="topbar-divider d-none d-sm-block" />
          <TaiKhoanAdmin account={this.props.account}></TaiKhoanAdmin>
        </ul>
      </nav>
    )
  }
  componentWillUnmount() {
    this.mounted = false;
  }
}
const mapStateToProps = (state) => {
  const { isLoggedIn, account } = state.auth;
  return {
    account: account,
    isLoggedIn: isLoggedIn
  }
}
export default connect(mapStateToProps)(HeaderAdmin);