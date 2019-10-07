import React from 'react';
import { connect } from 'react-redux'
import { Icon } from 'antd'

import '../../static/css/tools-header.css'

class ToolsHeader extends React.Component {

    iconbtn = (type,index) => {
        return (<div className='item' key={index}><Icon type={type} /></div>)
    }

    render() {
        let editTypes = ['edit', 'copy', 'delete', 'align-center', 'align-left', 'align-right',
            'bg-colors', 'bold', 'italic', 'underline', 'font-colors', 'font-size'];
        let charts = ['area-chart', 'pie-chart', 'bar-chart', 'dot-chart', 'line-chart','radar-chart','fund'];
        let editExts = ['line-height','column-width','column-height','sort-ascending','sort-descending'];
        return (<div className='tools-header'>
            <div className='item split'></div>
            {editTypes.map((x, i) => (this.iconbtn(x,i)))}
            <div className='item split'></div>
            {charts.map((x, i)=> (<div className='item' key={'chart'+i}><Icon type={x} /></div>))}
            <div className='item split'></div>
            {editExts.map((x, i)=> (<div className='item' key={'editExts'+i}><Icon type={x} /></div>))}
        </div>)
    }
}

export default connect(
    state => state,
    {}
)(ToolsHeader)

