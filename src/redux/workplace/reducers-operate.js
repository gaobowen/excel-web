import {
    HIT_TEST_OPERATE
} from './action-types'


const defaultCellSize = {
    width: 60,
    height: 22
}

const initData = {
    refObj: null,
    eleType: 'cell',
    hit: { x: 60, y: 22 },
    rect: {
        x: 60,
        y: 22,
        r: 0,
        ...defaultCellSize
    },
    preRect: {
        x: 60,
        y: 22,
        r: 0,
        ...defaultCellSize
    },
    coord: { rowIdx: 1, colIdx: 1 }
}

function locateVertical(defaultHeight, heights, offsetY) {
    let changedCount = heights.length;
    let changedOffset = 0;
    for (let i = 0; i < changedCount; i++) {
        changedOffset += heights[i][1];
        // 之前的默认row height
        let defaultoffset = (heights[i][0] - i) * defaultHeight;
        // 检查是否超过offsetY
        let checkoffset = (changedOffset + defaultoffset) - offsetY;
        if (checkoffset >= 0) {
            // 平齐
            if (checkoffset === 0) {
                return heights[i][0] + 1;
            }
            // 落在改变区间内
            else if (checkoffset < heights[i][1]) {
                return heights[i][0];
            }
            // 落在改变区间外
            else {
                // 当前的row坐标 - 多余的defaultHeight个数
                return heights[i][0] - Math.ceil((checkoffset - heights[i][1]) / defaultHeight, 0);
            }
        }
    }
    let defaultOffset = offsetY - changedOffset;
    let defaultCount = defaultOffset / defaultHeight;
    let localPositionY = defaultCount + changedCount;
    return parseInt(localPositionY)
}

function locateHorizontal(defaultWidth, widths, offsetX) {
    let changedCount = widths.length;
    let changedOffset = 0;
    for (let i = 0; i < changedCount; i++) {
        changedOffset += widths[i][1];
        let defaultoffset = (widths[i][0] - i) * defaultWidth;
        let checkoffset = (changedOffset + defaultoffset) - offsetX;
        if (checkoffset >= 0) {
            if (checkoffset === 0) {
                return widths[i][0] + 1;
            }
            else if (checkoffset < widths[i][1]) {
                return widths[i][0];
            }
            else {
                return widths[i][0] - Math.ceil((checkoffset - widths[i][1]) / defaultWidth, 0);
            }
        }
    }
    let defaultOffset = offsetX - changedOffset;
    let defaultCount = defaultOffset / defaultWidth;
    let localPositionX = defaultCount + changedCount;
    return parseInt(localPositionX)
}


const ctrlData = (state = initData, action) => {
    switch (action.type) {
        case HIT_TEST_OPERATE:
            {
                // 注意引用
                state.refObj = null;
                state.preRect = state.rect;
                state.eleType = action.data.ctrlData.eleType;
                if (action.data.ctrlData.eleType === 'cell') {
                    let idxH = locateHorizontal(defaultCellSize.width, [], action.data.ctrlData.hit.x);
                    let idxV = locateVertical(defaultCellSize.height, [], action.data.ctrlData.hit.y);
                    // 不允许选中
                    if(idxH < 1 || idxV < 1){
                        return state;
                    }
                    // 将来要改成实际宽高
                    let x = idxH * defaultCellSize.width;
                    let y = idxV * defaultCellSize.height;
                    let width = defaultCellSize.width;
                    let height = defaultCellSize.height;
                    state.rect = { x, y, width, height }
                    state.coord = { rowIdx: idxV, colIdx: idxH }

                } else if (action.data.ctrlData.eleType === 'media') {
                    state.refObj = {...action.data.ctrlData.refObj};
                    state.rect = { ...action.data.ctrlData.rect }
                    state.autoPress = action.data.ctrlData.autoPress;
                    state.hit = {...action.data.ctrlData.hit}
                }
                
                return { ...state }
            }
        default:
            return state;
    }
}

export default ctrlData;






//cell 只有位置，拖拽为框选（宽高+位置），无缩放
//image 交互，有缩放，有位移，有旋转


