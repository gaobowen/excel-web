import {
    ADD_EXCEL_SHEET,
    REMOVE_EXCEL_SHEET,
    CHANGE_EXCEL_SHEET_NAME,
    CHANGE_EXCEL_SHEET_SELECTED,
    DOWNLOAD_EXCEL
} from './action-types'

import Excel from 'exceljs';
import FileSaver from 'file-saver'

const getPositionStrX = (inputX) => {
    let baseCode = 'A'.charCodeAt();
    let x = parseInt(inputX);
    let x1 = String.fromCharCode(parseInt((x) % 26 + baseCode));
    do {
        x = parseInt(x / 26);
        if (x > 0) {
            x1 = String.fromCharCode(parseInt(x % 26 + baseCode - 1)) + x1
        } else
            break;
    }
    while (parseInt(x / 26) > 0)
    return x1;
}

const getCoordinates = (positionStr) => {
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
        // x列 y行
        return { x: colno - 1, y: parseInt(row[0]) - 1 }
    }
}

const creatBlankGridData = (isTest) => {
    let initGrid = [];
    for (let row = 0; row < 60; row++) {
        initGrid.push([]);
        for (let col = 0; col < 30; col++) {
            if (row === 0 && col === 0) {
                initGrid[0].push({ readOnly: true, value: '' })
            } else if (row === 0 && col > 0) {
                let colstr = getPositionStrX(col - 1);
                initGrid[0].push({ readOnly: true, value: colstr })
            } else if (row > 0 && col === 0) {
                initGrid[row].push({ readOnly: true, value: row })
            } else {

                //坐标验证
                if (isTest) {
                    if (row > 0 && col > 0) {
                        var coor = getCoordinates(initGrid[0][col].value + row)
                        initGrid[row].push({ value: `(${coor.x}, ${coor.y})` })
                    }
                } else {
                    initGrid[row].push({ value: `` })
                }

            }

        }
    }
    return initGrid;
}


const download = (dic) => {
    const wb = new Excel.Workbook();

    //sheet name
    for (let key in dic) {
        const ws = wb.addWorksheet(dic[key].name);
        ws.properties.defaultRowHeight = 16;
        //这里行列不能搞混
        let rowcount = dic[key].grid.length;
        let colcount = dic[key].grid[0].length;

        for (let rowidx = 1; rowidx < rowcount; rowidx++) {
            for (let colidx = 1; colidx < colcount; colidx++) {
                let row = ws.getRow(rowidx)
                if (!row) {
                    let rowdata = new Array(colcount).fill('');
                    ws.addRow(rowdata);
                    row = ws.getRow(rowidx)
                }
                row.getCell(colidx).value = dic[key].grid[rowidx][colidx].value;
            }
        }
    }

    //网上的a标签+blob下载的例子会文件损坏，原因不明。
    wb.xlsx.writeBuffer()
        .then(buffer => FileSaver.saveAs(new Blob([buffer]), `excel-web${Date.now()}.xlsx`))
        .catch(err => console.log('Error writing excel export', err))
}


const getStamp = () => (new Date().getTime().toString() + parseInt(Math.random() * 100))


//key name data
const initGridDatas = () => {

    //字典
    let dic = new Array();
    let key1 = getStamp()
    dic[key1] = {
        name: 'Sheet1',
        grid: creatBlankGridData(false),
    }
    dic[getStamp()] = {
        name: 'Sheet2',
        grid: creatBlankGridData(true),
    }

    return {
        dic,
        selectedKey: key1,
        length: 2
    };

}
const blankData = initGridDatas();

//UserHeader绑定
//sheet模块绑定
//footer模块绑定
const gridDatas = (state = blankData, action) => {
    switch (action.type) {
        case ADD_EXCEL_SHEET:
            {
                let addstate = { ...(state) }
                //let adddic = {...(state.dic) }
                let nameidx = addstate.length + 1;
                //sheetname 不能重复，否则download会报错
                for (let asKey in addstate.dic) {
                    if (addstate.dic[asKey].name === ('Sheet' + nameidx)) {
                        nameidx++;
                    }
                }
                let addkey = getStamp();
                addstate.dic[addkey] = {
                    grid: creatBlankGridData(),
                    name: 'Sheet' + nameidx
                };
                addstate['selectedKey'] = addkey;
                addstate.length += 1;
                return addstate;
            }
        case REMOVE_EXCEL_SHEET:
            {
                //至少需要存在一张表
                if (state.length < 2) {
                    return state;
                }
                let rmdic = new Array();
                let wouldSelect = undefined;
                if (action.data.key !== state.selectedKey) {
                    wouldSelect = state.selectedKey;
                }
                let hasRemove = false;
                for (let key in state.dic) {
                    if (key !== action.data.key) {
                        rmdic[key] = state.dic[key]
                        if (!wouldSelect) { wouldSelect = key }
                        continue;
                    }
                    hasRemove = true;
                }
                if (hasRemove) {
                    return {
                        dic: rmdic,
                        selectedKey: wouldSelect,
                        length: state.length - 1
                    };
                }
                return state;
            }
        case CHANGE_EXCEL_SHEET_NAME:
            {
                let changeState = { ...state }
                if (state[action.data.key]) {
                    changeState.dic[action.data.key].name =
                        action.data.name;
                    return changeState;
                }
                return state;
            }
        case CHANGE_EXCEL_SHEET_SELECTED:
            {
                let selectedState = { ...state }
                if (selectedState['selectedKey']) {
                    selectedState['selectedKey'] =
                        action.data.key;
                    return selectedState;
                }
                return state;
            }
        case DOWNLOAD_EXCEL:
            download(state.dic)
            return state;
        default:
            return state;
    }
}

export default gridDatas;