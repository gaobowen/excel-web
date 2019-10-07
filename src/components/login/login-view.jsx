import React from 'react';
import PropTypes from 'prop-types'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import GithubLogin from './github-login'
import DDLogin from './ddlogin';

//编写静态页面首先引入css
import '../../static/css/loginview.css'


class LoginView extends React.Component {
  //PropTypes.shape 用于检测对象的不同属性的不同类型
  static propTypes = {
    options:
      PropTypes.shape({
        loginMode: PropTypes.string.isRequired,
      }),
  }

  // 设置props默认值防止报错
  static defaultProps = {
    options: {
      loginMode: 'dingding'
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      options: { loginMode: 'dingding' }
    }
    if(props.location !== undefined)
    {
      if(props.location.pathname === '/excel-web/login/github')
      {
        props.options.loginMode = 'github';
      }
      else
      {
        props.options.loginMode = 'dingding';
      }
    }
    this.state.options.loginMode = props.options.loginMode;

    
  }

  changeLoginMode = (event) => {
    // console.log(event.target);
    let loginMode = event.target.id === 'tab-li-github' ? 'github' : 'dingding';
    // 使用props.history前首先使用withRoute
    //console.log(this.props.history);
    this.props.history.replace('/excel-web/login/' + loginMode);
    this.setState({ options: { loginMode } });
  }


  render() {
    //刷新页面后，路由与state不匹配，导致页面显示错误
    //解决方案：
    //1、把路由相关参数在state中剥离
    //2、state中相关的默认参数根据路由重新负责
    //console.log(this.props)

    return (
      <div className='login-view'>
        {/*这里ul没有把div撑开，需要确定height*/}
        <div className='tab-div'>
          <ul className='tabs'>
            {/* 这里还可以优化，使用Link或NavLink */}
            <li id='tab-li-dingding'
              className={this.state.options.loginMode === 'dingding' ? 'tab-item current' : 'tab-item'}
              onClick={this.changeLoginMode}>Dingding</li>
            <li id='tab-li-github'
              className={this.state.options.loginMode === 'dingding' ? 'tab-item' : 'tab-item current'}
              onClick={this.changeLoginMode}>Github</li>
          </ul>
        </div>
        
        <div className='login-view-content' key={this.props.location.key}>
          <Switch>
            <Route path='/excel-web/login/dingding' component={DDLogin} />
            <Route path='/excel-web/login/github' component={GithubLogin}/>
            <Redirect to='/excel-web/login/dingding' />
          </Switch>
          {}
        </div>
      </div>
    )
  }


}

export default withRouter(LoginView);