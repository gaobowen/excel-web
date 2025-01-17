import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginGithub } from '../../redux/login/actions'
import { Input, Button, Avatar } from 'antd'

import githubimg from '../../static/images/login/github.svg';
import '../../static/css/github-login.css'

class GithubLogin extends React.Component {
  constructor(props) {
    super(props);
    //props 不能扩展，只能外部传入
  }

  loginGithub = () => {
    this.props.loginGithub(this.userName);
  }

  handleChange = (event) => {
    this.userName = event.target.value;
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Avatar src={githubimg} size={64} className='login-github-svg' />
        <div className='login-username-text'>
          Github User Name
        </div>

        <Input className='login-username-input' placeholder='User Name' onChange={this.handleChange}
          onPressEnter={this.loginGithub} />

        <Button type="primary" className='login-github-btn' onClick={this.loginGithub}>Login</Button>
      </div>)
  }
}

GithubLogin.propTypes = {
  loginGithub: PropTypes.func.isRequired,
}

export default connect(
  state => ({ login: state.login }),
  { loginGithub }
)(GithubLogin)
