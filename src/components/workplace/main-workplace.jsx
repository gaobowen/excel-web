import React from 'react';
import { Layout } from 'antd';
import ExcelSheet from './excel-sheet'
import UserHeader from './user-header'
import ToolsHeader from './tools-header'
import ToolsFooter from './tools-footer'
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import { receiveUserInfo } from '../../redux/login/actions'
import { changedExcelSize } from '../../redux/workplace/actions'

import '../../static/css/main-workplace.css'


class MainWorkplace extends React.Component {
    constructor(props) {
        super(props);
        let loginCookie = cookie.load('loginCookie');
        if (loginCookie !== undefined) {
            var jstr = window.atob(loginCookie)
            let login = JSON.parse(jstr);
            if (login.userInfo.username !== undefined) {
                this.props.receiveUserInfo(login);
            }
        }
    }

    componentDidMount() {
        if (this.props.login.userInfo.username === undefined) {
            this.props.history.replace('/login')
        }
    }

    render() {
        //console.log(this.props)
        return (
            <div className='excel-main'>
                <div className='tool-header'>
                    <UserHeader />
                    <ToolsHeader/>
                </div>
                <div className='content-main'>
                    <div className='excel-container'>
                        <div className='excel-component'
                            style={{
                                width: this.props.excelSheet.width + 300,
                                height: parseInt(this.props.excelSheet.height) + 300
                            }}>
                            <ExcelSheet />
                        </div>
                    </div>
                </div>

                <div className='tool-footer-container'>
                    <ToolsFooter/>
                </div>
            </div>
        )
    }
}


export default connect(
    state => (state),
    { receiveUserInfo, changedExcelSize }
)(MainWorkplace);

