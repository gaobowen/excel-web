import React from 'react';
import PropTypes from 'prop-types'
import Datasheet from 'react-datasheet';
import { connect } from 'react-redux'
import { changedExcelSize, changeExcelSheetSelected } from '../../redux/workplace/actions'

import '../../static/css/excel-sheet.css'


//此开源控件在每个cell上都单独处理了事件，当初始化数组达到几百上千行时，操作会延迟卡顿，
//作为excel这种数据量比较大的控件来说，这样的设计思路是不可行的
//excel正确的设计方式 因该是数据展示层在下面，上面覆盖统一操作层（建议用canvas）作为交互层
class ExcelSheet extends React.Component {
    constructor(props) {
        super(props)
    }


    //坐标换算
    //列A-ZZ 行1-n
    //双字母把A看作1  列在前行在后例如 AA3
    //返回的坐标index从0开始
    getCoordinates = (positionStr) => {
        const row = positionStr.match(/[0-9]+/g) || [];
        const col = positionStr.match(/[A-Z]+/g) || [];

        if (row.length === 1 && col.length === 1) {
            let colstr = col[0].toString();
            let baseCode = 'A'.charCodeAt();
            let colno = 0;
            for (let index = 0; index < colstr.length; index++) {
                const charIdx = colstr[index].charCodeAt() - baseCode + 1;
                let temp = (Math.pow(26, colstr.length - index - 1) * charIdx)
                colno += temp;
            }
            // x列号 y行号
            return { x: colno - 1, y: parseInt(row[0]) - 1 }
        }
    }

    //坐标转字符串index 从0开始
    getPositionStr = (coordinates) => {
        let x = parseInt(coordinates.x);
        return this.getPositionStrX(x) + (coordinates.y + 1);
    }

    getPositionStrX = (inputX) => {
        if (inputX < 0) {
            throw Error('Error getPositionStrX inputX < 0')
        }
        let codeA = 'A'.charCodeAt(0);
        let inX = inputX + 1;
        let x = ''
        do {
            let numIdx = inX - 1;
            let ascIdx = numIdx % 26;
            x = String.fromCharCode(codeA + ascIdx) + x;
            inX = parseInt(numIdx / 26);
        }
        while (inX > 0)
        return x;
    }

    render() {
        this.grid = this.props.gridDatas.dic[this.props.gridDatas.selectedKey].grid;
        this.totalWidth = this.grid[0].length * 60;
        this.totalHeight = this.grid.length * 22;
        if (this.totalWidth !== this.props.excelSheet.width
            || this.totalHeight !== this.props.excelSheet.height) {
            this.props.changedExcelSize({
                width: this.totalWidth,
                height: this.totalHeight,
            })
        }

        return (
            <div style={{ width: this.totalWidth }}>
                <Datasheet
                    data={this.grid}
                    valueRenderer={(cell) => cell.value}
                    // eslint-disable-next-line no-unused-vars
                    onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
                    onCellsChanged={changes => {
                        const grid = this.grid.map(row => [...row])
                        changes.forEach(({ row, col, value }) => {
                            this.grid[row][col] = { ...grid[row][col], value }
                        })
                        this.render()
                    }}
                />
            </div>
        )
    }
}

ExcelSheet.propTypes = {
    gridDatas: PropTypes.object.isRequired,
    excelSheet: PropTypes.object.isRequired,
    changedExcelSize: PropTypes.func.isRequired,
    changeExcelSheetSelected: PropTypes.func.isRequired,
}

export default connect(
    state => { return ({ gridDatas: state.gridDatas, excelSheet: state.excelSheet }) },
    { changedExcelSize, changeExcelSheetSelected }
)(ExcelSheet);