import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "./../../actions/authActions"
import { Redirect } from "react-router-dom";
import wordApi from '../../api/wordApi';
class SignIn extends Component {
  state = {
    loginMethod: "",
    password: "",
  };


  handleChange = (e) => {
    // const fetchWordList = async () => {
    //   try {
    //     const params = {};
    //     const response = await wordApi.getAll(params);
    //     console.log('Fetch successful', response);

    //   } catch (error) {
    //     console.log('Fail', error);
    //   }
    // };
    // const fetchWord = async () => {
    //   try {
    //     const response = await wordApi.getDetail(1);
    //     console.log('Fetch successful', response);
    //   } catch (error) {
    //     console.log('Fail', error);
    //   }
    // }
    // fetchWordList();
    // fetchWord();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    // const { uid } = this.props;
    // console.log(uid)
    // if(uid) return <Redirect to="/"/>
    return (
      <form className="login100-form validate-form"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <div className="wrap-input100 validate-input mb-4"> <span className="label-input100">Email</span>
          <input className="input100" name="loginMethod" placeholder="Nhập tên tài khoản"
            type="email"
            id="loginMethod"
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="wrap-input100 validate-input mb-4"> <span className="label-input100">Mật khẩu</span>
          <input className="input100" name="password" placeholder="Nhập mật khẩu"
            type="password"
            id="password"
            onChange={this.handleChange}
          ></input>
        </div>

        <div className="container-login100-form-btn mt-2">
          <button className="btn btn-primary"> Đăng Nhập </button>
        </div>
        <a href="../index.html" className="mt-2">Về trang chủ</a>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  // const uid = state.data.Account.id
  // return {
  //   uid: uid,
  // };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => dispatch(signIn(cred))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
