import React from 'react'
import { connect } from 'react-redux'
import { addExcelSheet, removeExcelSheet, changeExcelSheetName, changeExcelSheetSelected } from '../../redux/workplace/actions'

import { Tabs, Button } from 'antd';

import '../../static/css/tools-footer.css'

const { TabPane } = Tabs;

class ToolsFooter extends React.Component {
  constructor(props) {
    super(props);


    this.newTabIndex = 0;
    // const panes = [
    // ];
    // for (let dickey in this.props.gridDatas.dic) {
    //   panes.push({
    //     title: this.props.gridDatas.dic[dickey].name,
    //     content: '',
    //     key: dickey
    //   })
    // }

    // this.state = {
    //   activeKey: this.props.gridDatas.selectedKey,
    //   panes,
    // };
  }

  onChange = activeKey => {
    //this.setState({ activeKey });
    this.props.changeExcelSheetSelected({ key: activeKey })
  };

  onEdit = (targetKey, action) => {
    //action 包含下面的 add 和 remove
    this[action](targetKey);
  };

  add = () => {
    // const { panes } = this.state;
    // const activeKey = (new Date().getTime().toString() + parseInt(Math.random() * 100));
    // const newTitle = `Sheet${this.props.gridDatas.length++}`;
    // panes.push({ title: 'New Tab', content: '', key: activeKey });
    // this.setState({ panes, activeKey });
    this.props.addExcelSheet();
  };

  remove = targetKey => {
    // let { activeKey } = this.state;
    // let lastIndex;
    // this.state.panes.forEach((pane, i) => {
    //   if (pane.key === targetKey) {
    //     lastIndex = i - 1;
    //   }
    // });
    // const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    // if (panes.length && activeKey === targetKey) {
    //   if (lastIndex >= 0) {
    //     activeKey = panes[lastIndex].key;
    //   } else {
    //     activeKey = panes[0].key;
    //   }
    // }
    // this.setState({ panes, activeKey });
    this.props.removeExcelSheet({
      key: targetKey
    })
  };

  render() {
    //console.log(this.props)
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


export default connect(
  state => ({ gridDatas: state.gridDatas }),
  {
    addExcelSheet,
    removeExcelSheet,
    changeExcelSheetName,
    changeExcelSheetSelected
  }
)(ToolsFooter)



