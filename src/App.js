import React from 'react';
import MainLogin from './components/login/main-login'
import MainWorkplace from './components/workplace/main-workplace'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';


class App extends React.Component {
  render() {
    return (< div className="App" >
      < Switch >
        < Route path='/excel-web/sheet' component={MainWorkplace} />
        < Route path='/excel-web/login' component={MainLogin} />
        < Redirect to='/excel-web/login' />
      </Switch >
    </div >
    );
  }
}

export default App;