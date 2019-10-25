import {
    ADD_EXCEL_SHEET,
    REMOVE_EXCEL_SHEET,
    CHANGE_EXCEL_SHEET_NAME,
    CHANGE_EXCEL_SHEET_SELECTED,
    DOWNLOAD_EXCEL,
    GET_SELECTED_GRID,
    ADD_DRAG_IMAGE,
    SORT_MEDIA_ELEMENTS
} from './action-types'
import Excel from 'exceljs';
import FileSaver from 'file-saver'

const defaultCellSize = {
    width: 60,
    height: 22
}

const getPositionStrX = (inputX) => {
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

const createBlankGridData = (isTest) => {
    let initGrid = [];
    for (let row = 0; row < 160; row++) {
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
                //坐标测试验证
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
    for (let key in dic) {
        const ws = wb.addWorksheet(dic[key].name);
        ws.properties.defaultRowHeight = 17;
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
                row.height = 17;
                row.getCell(colidx).value = dic[key].grid[rowidx][colidx].value;
            }
        }
        //add image
        if (dic[key].media.length > 0) {
            let media = dic[key].media;
            for (let index = 0; index < dic[key].media.length; index++) {
                let imageId = wb.addImage({
                    base64: media[index].src,
                    extension: media[index].ext,
                });
                //console.log(media[index])
                let tl = { col: 2, row: 2 }
                let br = { col: 6, row: 5 }
                if (media[index].rect) {
                    tl.col = media[index].rect.x / defaultCellSize.width;
                    tl.row = media[index].rect.y / defaultCellSize.height - 1;
                    br.col = (media[index].rect.x + media[index].rect.width) / defaultCellSize.width;
                    br.row = (media[index].rect.y + media[index].rect.height) / defaultCellSize.height - 1;
                    tl.col = tl.col < 0 ? 0 : tl.col;
                    tl.row = tl.row < 0 ? 0 : tl.row;
                    br.col = br.col < 0 ? 5 : br.col;
                    br.row = br.row < 0 ? 5 : br.row;
                }
                ws.addImage(imageId, { tl, br, editAs: 'oneCell' });
            }
        }

    }

    //网上的a标签+blob下载的例子会文件损坏，原因不明。
    wb.xlsx.writeBuffer()
        .then(buffer => FileSaver.saveAs(new Blob([buffer]), `excel-web${Date.now()}.xlsx`))
        .catch(err => console.log('Error writing excel export', err))
}


const getStamp = () => (new Date().getTime().toString() + parseInt(Math.random() * 100))

/*
media[]
{
fileType: 'img',
ext:'png'
src: e.target.result,
location: pos,
zIndex: 9990
}
*/
const initGridDatas = () => {
    //字典
    let dic = new Array();
    let key1 = getStamp()
    dic[key1] = {
        name: 'Sheet1',
        grid: createBlankGridData(false),
        media: [],
    }
    dic[getStamp()] = {
        name: 'Sheet2',
        grid: createBlankGridData(true),
        media: [],
    }
    return {
        dic,
        selectedKey: key1,
        length: 2
    };

}

const blankData = initGridDatas();

const gridDatas = (state = blankData, action) => {
    //console.log("gridDatas", action);
    switch (action.type) {
        case ADD_EXCEL_SHEET:
            {
                let addstate = { ...(state) }
                let nameidx = addstate.length + 1;
                //sheetname 不能重复，否则download会报错
                for (let asKey in addstate.dic) {
                    if (addstate.dic[asKey].name === ('Sheet' + nameidx)) {
                        nameidx++;
                    }
                }
                let addkey = getStamp();
                addstate.dic[addkey] = {
                    grid: createBlankGridData(),
                    name: 'Sheet' + nameidx,
                    media: [],
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
            {
                download(state.dic)
                return state;
            }
        case GET_SELECTED_GRID:
            {
                return state;
            }
        case ADD_DRAG_IMAGE:
            {
                let key = state['selectedKey'];
                if (key) {
                    let dic = state.dic[key];
                    dic.media.push(action.data);
                    dic.media = [...dic.media]
                }
                return state;
            }
        case SORT_MEDIA_ELEMENTS:
            {
                let key = state['selectedKey'];
                if (key) {
                    let dic = state.dic[key];
                    //排序是正常
                    //dic.media.sort((a, b) => (a.zIndex - b.zIndex));
                    // let top = dic.media.filter(data => data.zIndex > 9900);
                    // if(top.length === 1)
                    // {
                    //     let rmidx = dic.media.indexOf(top[0]);
                    //     dic.media.splice(rmidx,1);
                    //     dic.media.push(top[0]);
                    //     console.log('SORT_MEDIA_ELEMENTS HAS CHANGED', state)
                    // }
                    //console.log('SORT_MEDIA_ELEMENTS HAS CHANGED', dic)
                    // let hasChange = false;
                    // for (let idx = 0; idx < dic.media.length; idx++) {
                    //     if (dic.media[idx].zIndex != idx) {
                    //         hasChange = true;
                    //     }
                    //     dic.media[idx].zIndex = idx;
                    // }
                    // if (!hasChange || dic.media.length < 2) {
                    //     //console.log('SORT_MEDIA_ELEMENTS NO CHANGE', state)
                    //     return state;
                    // }

                    dic.media = [...dic.media]
                }
                return state;
            }
        default:
            return state;
    }
}

export default gridDatas;