import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  addExcelSheet,
  removeExcelSheet,
  changeExcelSheetName,
  changeExcelSheetSelected,
  hitTestOperate
} from '../../redux/workplace/actions'


import { Tabs } from 'antd';

import '../../static/css/tools-footer.css'

const { TabPane } = Tabs;

const initData = {
  refObj: null,
  eleType: 'cell',
  hit: { x: 60, y: 22 },
  rect: {
    x: 60,
    y: 22,
    r: 0,
    width: 60,
    height: 22
  },
  preRect: {
    x: 60,
    y: 22,
    r: 0,
    width: 60,
    height: 22
  }
}

class ToolsFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = activeKey => {
    this.props.changeExcelSheetSelected({ key: activeKey });
    this.props.hitTestOperate({
      ctrlData: initData,
    })
  };

  onEdit = (targetKey, action) => {
    //action 包含下面的 add 和 remove
    this[action](targetKey);
    this.props.hitTestOperate({
      ctrlData: initData,
    })
  };

  add = () => {
    this.props.addExcelSheet();
  };

  remove = targetKey => {
    this.props.removeExcelSheet({
      key: targetKey
    })
  };

  componentDidMount = () => {

  }

  render() {
    this.panes = [];
    for (let dickey in this.props.gridDatas.dic) {
      this.panes.push({
        title: this.props.gridDatas.dic[dickey].name,
        content: '',
        key: dickey
      })
    }
    return (
      <div className='tools-footer'>
        <Tabs
          onChange={this.onChange}
          activeKey={this.props.gridDatas.selectedKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

ToolsFooter.propTypes = {
  gridDatas: PropTypes.object.isRequired,
  addExcelSheet: PropTypes.func.isRequired,
  removeExcelSheet: PropTypes.func.isRequired,
  changeExcelSheetName: PropTypes.func.isRequired,
  changeExcelSheetSelected: PropTypes.func.isRequired,
  hitTestOperate: PropTypes.func.isRequired,
}

export default connect(
  state => ({ gridDatas: state.gridDatas }),
  {
    addExcelSheet,
    removeExcelSheet,
    changeExcelSheetName,
    changeExcelSheetSelected,
    hitTestOperate
  }
)(ToolsFooter)



