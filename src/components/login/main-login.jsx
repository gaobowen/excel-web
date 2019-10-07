import React from 'react';
import LoginView from './login-view'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { receiveUserInfo } from '../../redux/login/actions'
import cookie from 'react-cookies'

import bgimg from '../../static/images/login/main-bg.png';
import loginviewbgimg from '../../static/images/login/login-input-bg.png';
import '../../static/css/mainlogin.css'

class MainLogin extends React.Component {
  constructor(props) {
    super(props);

    //在正式的web应用中，通常使用浏览器缓存的cookie值作为key，向redis等缓存服务端获取session信息，
    //进而判断用户是否需要登录。这里刷新页面后会丢失dom中登录状态，尝试用cookie base 64 存储登录信息
    let loginCookie = cookie.load('loginCookie');
    if (loginCookie !== undefined) {
      var jstr = window.atob(loginCookie)
      let login = JSON.parse(jstr);
      if (login.userInfo.username !== undefined) {
        this.props.receiveUserInfo(login);
      }
    }
  }

  receiveUserInfo(params) {

  }

  componentDidMount() {
    if (this.props.userInfo.username !== undefined) {
      this.props.history.replace('/excel-web', this.state);
    }
  }
  componentDidUpdate() {
    if (this.props.userInfo.username !== undefined) {
      this.props.history.replace('/excel-web', this.state);
    }
  }

  render() {

    if (this.props.userInfo.username !== undefined) {
      return (<div></div>)
    }

    return (
      <div>
        <div className='bgdiv'>
          <img className='bgimg' src={bgimg} alt='loginbgimg' />
        </div>
        <div className='logincontainer'>
          <div>
            <div className='loginviewbg outradius'>
              <img className='loginviewbgimg' src={loginviewbgimg} alt='' />
            </div>
            <LoginView />
          </div>
        </div>
      </div>
    )
  }
}

MainLogin.propTypes = {
  userInfo: PropTypes.object.isRequired,
  receiveUserInfo: PropTypes.func.isRequired,
}

//react diff 通过setState来更新ui，这里绑定的数据越小，ui更新的效率就越高
//这里的state.login
export default connect(
  state => ({ userInfo: state.login.userInfo }),
  { receiveUserInfo }
)(MainLogin)
