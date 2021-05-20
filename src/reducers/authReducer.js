import { useJwt } from "react-jwt";
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
    learned: [],
    roles: [],
    follower: [],
    following: []
  },
  token: '',
  refreshToken: ''
}
const initialState = () => {
  return {
    ...initialState,
    isLoggedIn: localStorage.getItem('account') ? true: false,
    account:  localStorage.getItem('account') === null ? initState.account : JSON.parse(localStorage.getItem('account')),
    token: localStorage.getItem('token') === null ? "" : localStorage.getItem('token')
  }
}
const authReducer = (state = initialState(), action) => {

  switch (action.type) {
    case "SIGN_IN": {
      toast("Xin chào bạn đã đến với website", {type: 'info'});
      return {
        ...state,
        isLoggedIn: true,
        account: action.account,
        token: action.token,
      };
    }
    case "SIGN_IN_ERR": {
      toast("Tài khoản hoặc mật khẩu không đúng",{type: 'error'});
      return state;
    }
    case "SIGN_IN_ERR_PASS": {
      toast("Mật khẩu không đúng")
      return state;
    }
    case "SIGN_IN_ERR_EMAIL": {
      toast("Tài khoản không tồn tại", {type: 'error'})
      return state;
    }
    case "SIGN_UP": {
      toast("Đăng ký thành công");
      toast("Xin chào bạn đã đến với website",{type: 'success'});
      return state;
    }
    case "SIGN_UP_ERR": {
      toast("Lỗi");
      return state;
    }
    case "SIGN_UP_ERR_EMAIL": {
      return { authError_Email: 'Email đã được đăng ký'}
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
        account: initState.account,
        token: ''
      });
    }
    case "TOKEN_EXPIRED": {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      return ({
        ...state,
        isLoggedIn: false,
        account: initState.account,
        token: ''
      });
    }
    case "TIME_OUT":{
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      return ({
        ...state,
        isLoggedIn: false,
        account: initState.account,
        token: ''
      });
    }
    case "FOLLOW_USER":{
      console.log(action.following);
      if(state.account.following.some(fl => fl.accountId == action.following.id)){
        return {
          ...state,
          account: {
            ...state.account,
            following: state.account.following.filter(fl => fl.accountId != action.following.id)
          }
        }
      }
      else{
        var following = {
          accountId: action.following.id,
          userName: action.following.username,
          photoUrl: action.following.photoUrl
        }
        return{
          ...state,
          account: {
            ...state.account,
            following: [following,...state.account.following]
          }
        }
      }
    }
    default:
      return state;
  }
};

export default authReducer;
