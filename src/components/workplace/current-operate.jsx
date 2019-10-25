
export const scrollData = { offsetX: 0, offsetY: 0 }

export const headerData = { offsetHeight: 0 }

export const getOperatePositon = (clientX, clientY) => {
    return {
        x: clientX + scrollData.offsetX,
        y: clientY - headerData.offsetHeight + scrollData.offsetY,
    }
}

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
    callback : ()=>{}
}

//export const copyRect()
