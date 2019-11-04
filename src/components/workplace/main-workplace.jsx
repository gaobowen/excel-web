import React from 'react';
import PropTypes from 'prop-types';
import ExcelSheet from './excel-sheet'
import UserHeader from './user-header'
import ToolsHeader from './tools-header'
import ToolsFooter from './tools-footer'
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import { receiveUserInfo } from '../../redux/login/actions'
import {
    changedExcelSize,
    hitTestOperate,
    addDragImage
} from '../../redux/workplace/actions'
import {
    scrollData,
    headerData,
    getStampId,
    getOperatePositon,
} from './current-operate'
import MediaContainer from './media-container'
import CellController from './controllers/cell-controller'
import MediaController from './controllers/media-controller'
import { ReadBase64Dimension } from '../../utils/image-dimension'
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
        this.getController();
    }

    currentController = null;
    mediaElements = [];

    componentDidMount() {
        if (this.props.login.userInfo.username === undefined) {
            this.props.history.replace('/excel-web/login/github')
        }
        let toolHeaderBox = document.getElementById("toolHeaderId");
        if (toolHeaderBox) {
            this.toolsHeaderOffsetHeight = toolHeaderBox.offsetHeight
            headerData.offsetHeight = toolHeaderBox.offsetHeight
            //console.log(this.toolsHeaderOffsetHeight)
        }
    }

    getController = () => {
        if (this.props.ctrlData.eleType === 'cell') {
            if (this.currentController && this.currentController instanceof CellController) {
                //this.currentController.props.ctrlData
                //console.log(this.currentController)
            }
            this.currentController = (<CellController ctrlData={{ ...this.props.ctrlData }} />)
        } else if (this.props.ctrlData.eleType === 'media') {
            this.currentController = (<MediaController ctrlData={{ ...this.props.ctrlData }} />)
        }
        return this.currentController;
    }

    getScrollData = (e) => {
        scrollData.offsetX = e.target.scrollLeft;
        scrollData.offsetY = e.target.scrollTop;
    }

    hitOperateLayerHandle = (e) => {
        this.ignoreDrag(e)
        e.target.focus();
        let hit = getOperatePositon(e.clientX, e.clientY);
        if (e.clientX > this.props.excelSheet.width
            || e.clientY > this.props.excelSheet.height) {
            return;
        }
        let ctrlData = { ...this.props.ctrlData };
        ctrlData.preRect = { ...this.props.ctrlData.preRect };
        ctrlData.rect = { ...this.props.ctrlData.rect };
        ctrlData.refObj = null;
        ctrlData.hit = hit;
        ctrlData.eleType = 'cell'
        this.props.hitTestOperate({
            ctrlData
        })
    }

    ignoreDrag = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    dropInHandle = (event) => {
        this.ignoreDrag(event);
        let files = event.dataTransfer.files;
        let file = files[0];
        if (file) {
            let reader = new FileReader();
            let pos = getOperatePositon(event.clientX, event.clientY)
            let add = this.props.addDragImage;
            let exts = file.name.split('.');
            reader.onload = function (e) {
                let addExt = exts[exts.length - 1].toLowerCase();
                let originalSize = ReadBase64Dimension(e.target.result, addExt);
                //console.log('originalSize', originalSize)
                add({
                    id: getStampId(),
                    fileType: 'img',
                    ext: addExt,
                    src: e.target.result,
                    location: pos,
                    zIndex: 9990,
                    autoSeleted: true,
                    originalSize
                })
            }
            reader.readAsDataURL(file);
        }
    }
    //功能增多后，主界面需要 shouldComponentUpdate 优化
    render() {
        return (
            <div className='excel-main'>
                <div className='tool-header' id='toolHeaderId'>
                    <UserHeader />
                    <ToolsHeader />
                </div>
                <div className='content-main' id='contentMainId' onScroll={this.getScrollData}>
                    <div className='excel-container'>
                        <div className='excel-component'
                            style={{
                                width: this.props.excelSheet.width + 300,
                                height: parseInt(this.props.excelSheet.height) + 300
                            }} >
                            <ExcelSheet />
                            <div className='operateLayer' id='operateLayerId'
                                //屏蔽点击穿透！
                                onClick={e => this.ignoreDrag(e)}
                                onContextMenu={e => this.ignoreDrag(e)}
                                onMouseDown={this.hitOperateLayerHandle}
                                onDragEnter={this.ignoreDrag}
                                onDragOver={(event => {
                                    this.ignoreDrag(event)
                                })}
                                onDrop={this.dropInHandle}
                            >
                                <MediaContainer />
                                {/* <CellController ctrlData={this.props.ctrlData} />
                                <MediaController ctrlData={this.props.ctrlData} /> */}
                                {this.getController()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='tool-footer-container'>
                    <ToolsFooter />
                </div>
            </div>
        )
    }
}

MainWorkplace.propTypes = {
    history: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    excelSheet: PropTypes.object.isRequired,
    ctrlData: PropTypes.object.isRequired,
    gridDatas: PropTypes.object.isRequired,
    receiveUserInfo: PropTypes.func.isRequired,
    changedExcelSize: PropTypes.func.isRequired,
    hitTestOperate: PropTypes.func.isRequired,
    addDragImage: PropTypes.func.isRequired,
}

export default connect(
    state => (state),
    {
        receiveUserInfo,
        changedExcelSize,
        hitTestOperate,
        addDragImage
    }
)(MainWorkplace);

