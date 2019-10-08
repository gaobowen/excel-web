import { DINGDING_LOGIN, GITHUB_LOGIN, USER_LOGOUT, RECEIVE_USER_INFO } from './action-types';
import cookie from 'react-cookies'


const initState = { userInfo: { errcode: 0 } };

function login(state = initState, action) {
  switch (action.type) {
    //login的状态触发由receive完成
    case DINGDING_LOGIN: 
      return state;
    case GITHUB_LOGIN:
      return state;
    case USER_LOGOUT:
      //删除缓存的额cookie，把状态设置为初始值
      cookie.remove('loginCookie', { path: '/' });
      return { ...initState };
    case RECEIVE_USER_INFO:
      // 这里的case要用大括号，防止变量穿透，由eslint报错提醒
      {
        let ret = { ...action.data };
        if (action.data.errcode !== undefined) {
          ret.userInfo.errcode = action.data.errcode;
        }
        else {
          ret.userInfo.errcode = 0;
        }
        return { ...ret };
      }
    default:
      return { ...state };
  }
}

export default login;