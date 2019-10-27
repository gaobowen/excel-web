
export const scrollData = { offsetX: 0, offsetY: 0 }

export const headerData = { offsetHeight: 0 }

export const getOperatePositon = (clientX, clientY) => {
    return {
        x: clientX + scrollData.offsetX,
        y: clientY - headerData.offsetHeight + scrollData.offsetY,
    }
}

export const getStampId = () => (new Date().getTime().toString() + parseInt(Math.random() * 100))

export const dragMove = {
    x: 0,
    y: 0,
    isDrag: false,

    start: function (clientX, clientY) {
        this.isDrag = true;
        this.x = clientX;
        this.y = clientY;
    },

    changed: function (clientX, clientY) {
        if (!this.isDrag) {
            this.x = 0;
            this.y = 0;
            return {
                dx: 0,
                dy: 0
            }
        }
        let dx = clientX - this.x;
        let dy = clientY - this.y;
        this.x = clientX;
        this.y = clientY;
        //console.log('dragMovechanged')
        return { dx, dy }
    },

    completed: function () {
        this.x = 0;
        this.y = 0;
        this.isDrag = false;
    }
}


export const zIndexEventListener = {
    callback: () => { }
}

export const blankCellData = { value: '' }

export const currentTbody = { current : undefined };


export const commitCellData = (rowIdx, colIdx, data) => {
    //采用原生赋值方式，react承载cell会产生大量fiber节点，操作反而会变慢。
    //经过测试采用索引速度最快 tbody.rows[x].cells[y] 
    //@2019-10-27 即将弃用此方法，转向canvas
    if (currentTbody.current.rows){
        currentTbody.current.rows[rowIdx].cells[colIdx].childNodes[0].innerHTML = data.value;
        //next todo 修改样式
    }
}

// eslint-disable-next-line no-unused-vars
export const commitCellsRange = (start, end, dataRange)=>{


}



// eslint-disable-next-line no-unused-vars
export const changeRowHeight = (rowIdx, h)=>{


}


//export const copyRect()
