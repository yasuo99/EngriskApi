import { toast } from "react-toastify"
const initState = {
  authError_Email: null,
  authError_Pass: null,
  isLoggedIn: false,
  account: {
    id: 0,
    email: '',
    fullname: '',
    username: '',
    photoUrl: '',
    isLocked: false,
    age: 0,
    address: '',
    phoneNumber: '',
    levelName: '',
    exp: '',
    point: '',
  },
  token: '',
  refreshToken: ''
}
const authReducer = (state = initState, action) => {

  switch (action.type) {
    case "SIGN_IN": {
      toast("Xin chào bạn đã đến với Duolingo");
      return {
        ...state,
        isLoggedIn: true,
        account: action.account,
        token: action.token,
      };
    }
    case "SIGN_IN_ERR": {
      toast("Tài khoản hoặc mật khẩu không đúng");
      return state;
    }
    case "SIGN_IN_ERR_PASS": {
      toast("Mật khẩu không đúng")
      return state;
    }
    case "SIGN_IN_ERR_EMAIL": {
      toast("Tài khoản không tồn tại")
      return state;
    }
    case "SIGN_UP": {
      toast("Xin chào bạn đã đến với Duolingo");
      return state;
    }
    case "SIGN_UP_ERR": {
      toast("Lỗi");
      return state;
    }
    case "SIGN_UP_ERR_EMAIL": {
      return { authError_Email: 'Email đã được đăng ký' }
    }
    case "SIGN_UP_ERR_PASS": {
      return { authError_Pass: 'Mật khẩu xác nhận không đúng' }
    }
    case "SIGN_OUT": {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      toast("Đăng xuất thành công");
      return ({
        ...state,
        isLoggedIn: false,
        account: {},
        token: ''
      });
    }
    default:
      return state;
  }
};

export default authReducer;
