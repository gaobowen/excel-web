import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MainLogin from './components/login/main-login'
import MainWorkplace from './components/workplace/main-workplace'
import { Route, Switch, Redirect, Router } from 'react-router-dom'
import cookie from 'react-cookies'

//import ExampleBasicSheet from './components/react-datasheet-example'
//import Example from './components/react-data-grid-example'

import './App.css';


class App extends React.Component {



    render() {

        return (< div className="App" >
            < Switch >
                < Route path='/excel-web/login' component={MainLogin} />
                < Route path='/excel-web' component={MainWorkplace} />
                < Redirect to='/excel-web/login' />
            </Switch >
        </div >
        );
    }


}

// App.propTypes = {
//   receiveUserInfo: PropTypes.func.isRequired,
// }

export default App;