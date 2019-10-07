import { DINGDING_LOGIN, GITHUB_LOGIN, USER_LOGOUT, RECEIVE_USER_INFO } from './action-types';
import cookie from 'react-cookies'


const initState = { userInfo: { errcode: 0 } };

function login(state = initState, action) {
  switch (action.type) {
    case DINGDING_LOGIN: //login的状态触发由receive完成
      return state;
    case GITHUB_LOGIN:
      return state;
    case USER_LOGOUT:
      //删除缓存的额cookie，把状态设置为初始值
      cookie.remove('loginCookie',{ path: '/' });
      return { ...initState };
    case RECEIVE_USER_INFO:
      let ret = { ...action.data }
      if (action.data.errcode !== undefined) {
        ret.userInfo.errcode = action.data.errcode;
      }
      else {
        ret.userInfo.errcode = 0;
      }
      //console.log(ret);
      return { ...ret };
    default:
      return { ...state };
  }
}

export default login;