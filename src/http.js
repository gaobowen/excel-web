import axios from 'axios';
import cookie from 'react-cookies'
import { message } from 'antd';

let httpApi = {};

//let dingurl = 'https://oapi.dingtalk.com/sns/getuserinfo_bycode?accessKey=dingoauctaoft7kia4pdvx';

httpApi.postDinging = () => {
    //https://oapi.dingtalk.com/ 此api需要服务端完成，这里用timeout模拟
    return new Promise((resolve) => {
        cookie.remove('loginCookie', { path: '/' })
        setTimeout(() => {
            let retobj = {
                    userInfo: {
                        errcode: 0,
                        username: 'DingUser',
                        avatarUrl: 'https://gtms03.alicdn.com/tps/i3/TB1opXxHXXXXXahXpXXvBLt6FXX-230-230.png'
                    }
                }
            cookie.save('loginCookie', window.btoa(JSON.stringify(retobj)), { path: '/' });
            resolve(retobj);
        }, 300)
    })

};

httpApi.getGithub = async(username) => {
    let retobj = {
        userInfo: {
            errcode: 0
        }
    };
    try {
        let resp = await axios.get(`https://api.github.com/users/${username}`);
        //debugger;
        cookie.remove('loginCookie', { path: '/' })
        if (resp.data.login !== undefined) {
            retobj.userInfo.username = resp.data.login;
            retobj.userInfo.avatarUrl = resp.data.avatar_url;
            cookie.save('loginCookie', window.btoa(JSON.stringify(retobj)), { path: '/' });
        } else {
            message.error('User name not found.');
            retobj.errcode = -1;
        }
    } catch (error) {
        message.error('User name not found.');
    }
    return retobj;
}



export default httpApi;