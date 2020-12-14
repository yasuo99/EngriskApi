import React, { Component } from "react";
import { connect } from "react-redux";
import {signUp} from "./../../actions/authActions"

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm : "",
    lastName: "",
    firstName: "",
    dateOfBirth: "",
    address: "",
    gender: "male",
    mobilePhone: "",
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value,
    });
  };
  handleConfirmPassword = event => {
    this.setState({
      passwordConfirm: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    var {id, email, password, passwordConfirm, lastName, firstName, dateOfBirth, address, gender, mobilePhone} = this.state;
    var user = {
        id : id,
        Email : email,
        Password : password,
        Fullname : lastName + firstName,
        DateOfBirth : dateOfBirth,
        Address : address,
        Gender : gender,
        Phone : mobilePhone,
        PasswordConfirm : passwordConfirm,
    };
    this.props.signUp(user);
  };
  render() {
    const {authError_Email, authError_Pass} = this.props
    return (
          <form className="login100-form validate-form"
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <div className="wrap-input100 validate-input mb-3" data-validate="Username is required"> <span className="label-input100">Email</span>
              <input className="input100" placeholder="Nhập tên tài khoản"
                required
                type="email"
                id="email"
                onChange={this.handleChange}
              ></input>
            </div>
            { authError_Email ? <p className="text-danger error">{authError_Email}</p> : null }
            <div className="wrap-input100 validate-input mb-3" data-validate="Password is required"> <span className="label-input100">Mật khẩu</span>
              <input className="input100" type="password" name="pass" placeholder="Nhập mật khẩu"
                minLength="6" maxLength="32" required
                id="password"
                onChange={this.handlePasswordChange}
              ></input>
            </div>
            <div className="wrap-input100 validate-input mb-3"> <span className="label-input100">Nhập lại mật khẩu</span>
              <input className="input100" type="password" name="pass" placeholder="Nhập lại mật khẩu"
                minLength="6" maxLength="32" required
                id="password"
                onChange={this.handleConfirmPassword}
              ></input>
            </div>
            { authError_Pass ? <p className="text-danger error">{authError_Pass}</p> : null }
            <div className="wrap-input100 validate-input mb-3">
              <span className="label-input100">Họ và tên lót</span>
              <input className="input100" name="lastName" placeholder="Nhập họ và tên lót"
                required
                type="text"
                id="lastName"
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="wrap-input100 validate-input mb-3">
              <span className="label-input100">Tên</span>
              <input className="input100" name="firstName" placeholder="Nhập tên"
                required
                type="text"
                id="firstName"
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="wrap-input100 validate-input mb-3">
            <span className="label-input100">Ngày sinh</span>
              <input className="input100" name="dateOfBirth"
                required
                type="datetime-local"
                id="dateOfBirth"
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="wrap-input100 validate-input mb-3"> <span className="label-input100">Địa chỉ</span>
              <input className="input100" name="address" placeholder="Nhập địa chỉ"
                required
                type="text"
                id="address"
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="wrap-input100 validate-input mb-3"> <span className="label-input100">Số điện thoại</span>
              <input className="input100" name="mobilePhone" placeholder="Nhập số điện thoại"
                required
                type="text"
                id="mobilePhone"
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="form-group validate-input mb-3 pt-2">
              <span className="label-input100">Giới tính</span>
              <label className="radio inline">
                <input type="radio" name="gender" value="male" checked onChange={this.handleChange} id="gender"></input> Nam
              </label>
              <label className="radio">
                <input type="radio" name="gender" value="female" onChange={this.handleChange} id="gender"></input> Nữ
              </label>
            </div>
            <div className="container-login100-form-btn">
              <button className="btn btn-primary"> Đăng Ký </button>

            </div>
            <a href="../index.html" className="mt-2">Về trang chủ</a>
          </form>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError_Email: state.authError_Email,
    authError_Pass: state.authError_Pass,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => dispatch(signUp(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);