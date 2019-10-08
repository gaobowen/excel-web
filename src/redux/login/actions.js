import { USER_LOGOUT, RECEIVE_USER_INFO } from './action-types';
import httpApi from '../../http' 

export const loginDingding = (params) => {
    return async dispatch => {
        
        let ret = await httpApi.postDinging(params);
        console.log(ret);
        dispatch(receiveUserInfo({...ret}));
            

    }
}

export const loginGithub = (params) => {
    return async dispatch => {
        let ret = await httpApi.getGithub(params)
        dispatch(receiveUserInfo({...ret}));
    }
}

export const logout = (params) => ({ type: USER_LOGOUT, data: params });

export const receiveUserInfo = (params) => ({ type: RECEIVE_USER_INFO, data: params })