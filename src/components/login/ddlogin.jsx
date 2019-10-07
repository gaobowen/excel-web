import React from 'react'
import DingQrcodeLogin from './ding-qrcode-login'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginDingding } from '../../redux/login/actions'


// https://ding-doc.dingtalk.com/doc#/serverapi3/mrugr3
class DDLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 测试 appid
            APPID: 'dingoauctaoft7kia4pdvx',  
            // 跳转页面
            REDIRECT_URI: 'https://gaobowen.github.io/excel-web/login/dingding' //https://gaobowen.github.io/excel-web
        }
    }
    UNSAFE_componentWillMount () {
        // 触发回调时处理回调链接,举例：如果查询字符串中含有state,且为dinglogin（可自行设置）,
        // 则触发扫描登录的相应处理方法，比如登录。
        if (this.props.location.search === undefined) {
            //console.log(this.props.location)
            return;
        }
        //const state = this.props.location && this.props.location.query.state;
        if (this.props.location.search.indexOf('dinglogin') !== -1) {
            let keyvalues = this.props.location.search.replace("?", "").split("&");
            let kv = {};
            for (let index = 0; index < keyvalues.length; index++) {
                const pairs = keyvalues[index].split('=');
                kv[pairs[0].toString()] = pairs[1];
            }
            //模拟获取用户数据
            console.log('this.props.location.search.indexOf')
            this.props.loginDingding({});
            return;
            //getuserinfo_bycode为服务端api 前端不支持
            // let keyvalues = this.props.location.search.replace("?", "").split("&");
            // let kv = {};
            // for (let index = 0; index < keyvalues.length; index++) {
            //     const pairs = keyvalues[index].split('=');
            //     kv[pairs[0].toString()] = pairs[1];
            // }
            // console.log(kv);
            // const code = kv.code;
            // const timestamp = new Date().getTime().toString();
            // let hash = CryptoJS.HmacSHA256(timestamp, "1e2K9qeTnKJCEbQwBTiFWVZKDoEvlzgpcw2Psv3kmOguuezpbmRl2k37dMbHFaIC");
            // var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
            // axios.post(`https://oapi.dingtalk.com/sns/getuserinfo_bycode?accessKey=dingoauctaoft7kia4pdvx&timestamp=${timestamp}&signature=${hashInBase64}`, {
            //     tmp_auth_code: code,
            // })
            //     .then(function (response) {
            //         console.log('resp')
            //         console.log(response)
            //     })
            //     .catch(function (error) {
            //         console.log('error')
            //         console.log(error);
            //     });
            // ex: dispatch(scanLogin({tmp_auth_code: code}));
        }
    }
    componentDidMount() {
        // 监听消息处理方法
        const handleMessage = (event) => {
            // 获取loginTempCode
            //const loginTempCode = event.data;
            // 获取消息来源
            const origin = event.origin;
            // 拼接 url
            //const url = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.state.APPID}&response_type=code&scope=snsapi_login&state=dinglogin&redirect_uri=${this.state.REDIRECT_URI}&loginTmpCode=${loginTempCode}`
            // 如果来源为https://login.dingtalk.com，则在当前窗口打开回调链接
            if (origin === 'https://login.dingtalk.com') {
                
                this.props.loginDingding({});

                // github pages 为静态页面跳转后会丢失页面js信息。这里跳过此步骤
                //window.open(encodeURI(url), '_parent')
            }
        };
        // 监听iframe的消息
        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', handleMessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', handleMessage);
        }
    }

    //这是错误的写法，方法需要绑定，也可以使用箭头函数自动绑定
    loginDingding() {
        console.log('loginDingding')
    }

    render() {
        const options = {
            id: "login-container",
            goto: `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.state.APPID}&response_type=code&scope=snsapi_login&state=dinglogin&redirect_uri=${this.state.REDIRECT_URI}`,
            width: '350px',
            height: '350px',
        }

        return (
            <div id="login-container" style={{ opacity: 0.78 }}>
                <DingQrcodeLogin options={options} />
            </div>
        )
    }
}

DDLogin.propTypes = {
    loginDingding: PropTypes.func.isRequired,
    location : PropTypes.object.isRequired,
}

export default connect(
    state => ({ login : state.login }),
    { loginDingding }
)(DDLogin)
