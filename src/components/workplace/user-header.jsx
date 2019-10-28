import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../redux/login/actions'
import { downloadExcel } from '../../redux/workplace/actions'
import { Dropdown, Menu, Avatar, Button } from 'antd'

import '../../static/css/user-header.css'

class UserHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleMenuClick = e => {
            if (e.key === '2') {
                this.props.logout({});
                window.open(encodeURI('http://' + window.location.host + '/excel-web'), '_parent');
            }
        };

        this.state.downMenu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item className='menu-item' key='1' >
                    {this.props.login.userInfo.username}
                </Menu.Item>
                <Menu.Item className='menu-item' key='2' >
                    Logout
                </Menu.Item>
            </Menu>
        );
    }

    download = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.downloadExcel();
    }

    render() {

        return (
            <div className='user-header'>
                <div className='header-title'>Technology Changes Lives</div>
                <div className='items'>
                    <Dropdown overlay={this.state.downMenu} className='item avatar'>
                        <Avatar size={40} src={this.props.login.userInfo.avatarUrl} className='item avatar'></Avatar>
                    </Dropdown>
                    <div className='item split' ></div>
                    <Button type="primary" icon="download" className='item btn' onClick={this.download}>Download</Button>
                </div>

            </div>
        );
    }
}

UserHeader.propTypes ={
    login : PropTypes.object.isRequired,
    logout : PropTypes.func.isRequired,
    downloadExcel : PropTypes.func.isRequired,
}


export default connect(
    state => state,
    { logout, downloadExcel }//这里要用大括号，容易遗漏
)(UserHeader);