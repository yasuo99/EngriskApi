import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignIn from "./../../components/auth/SignIn"

class SignInPage extends Component {

  render() {
    const { uid } = this.props;
    if(uid) return <Redirect to="/"/>
    return (
      <div className="container-login100">
      <div className="wrap-login100">
        <div className="login100-form-title">
          <h3 className="text-primary">Đăng Nhập</h3>
        </div>
        <SignIn />
       </div>
    </div>
      );
  }
}

const mapStateToProps = (state) => {

  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
