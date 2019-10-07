import { DINGDING_LOGIN, GITHUB_LOGIN, USER_LOGOUT, RECEIVE_USER_INFO } from './action-types';
import httpApi from '../../http' 

//import axios from 'axios'
//import CryptoJS from 'crypto-js/crypto-js'
//export const loginDingding = (params) => ({ type: DINGDING_LOGIN, data: params });

export const loginDingding = (params) => {
    return async dispatch => {
        
        let ret = await httpApi.postDinging(params);
        console.log(ret);
        dispatch(receiveUserInfo({...ret}));
            

    }
}

//export const loginGithub = (params) => ({ type: GITHUB_LOGIN, data: params });

export const loginGithub = (params) => {
    return async dispatch => {
        let ret = await httpApi.getGithub(params)
        //console.log(ret);
        dispatch(receiveUserInfo({...ret}));
    }
}

export const logout = (params) => ({ type: USER_LOGOUT, data: params });

export const receiveUserInfo = (params) => ({ type: RECEIVE_USER_INFO, data: params })