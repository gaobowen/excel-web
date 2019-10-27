import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { dragMove } from '../current-operate'
import { getOperatePositon } from '../current-operate'
import { hitTestOperate, sortMediaElements } from '../../../redux/workplace/actions'

/*
ctrlData:{
    refObj: null,
    eleType: 'cell',
    hit: { x: 60, y: 22 },
    rect: {
        x: 60,
        y: 22,
        r: 0,
        width,
        height,
    },
    preRect: {
        x: 60,
        y: 22,
        r: 0,
        width,
        height,
    }
}
*/

function MediaController(props) {
    dragMove.completed();

    //指向当前已渲染完成的，正在初始化的不算。
    const divEle = useRef(null);
    const [state, setstate] = useState(props.ctrlData)
    if (!Object.is(state, props.ctrlData)) {
        setstate(props.ctrlData);
    }

    let selEle = document.getElementById(props.ctrlData.refObj.data.id);
    props.ctrlData.refObj.data.zIndex = 9991;
    selEle.style.zIndex = 9991;

    let display = props.ctrlData.eleType === 'media' ? 'block' : 'none';
    if (props.ctrlData.eleType !== 'media') {
        return;
    }
    const mystyle = {
        display: display,
        backgroundColor: '#ffffff00',
        position: 'absolute',
        overflow: 'visible',
    }
    let x = props.ctrlData.rect.x;
    let y = props.ctrlData.rect.y;
    let width = props.ctrlData.rect.width;
    let height = props.ctrlData.rect.height;

    if (display === 'block') {
        mystyle.left = `${x - 1.9}px`;
        mystyle.top = `${y - 1.5}px`;
        mystyle.width = `${width + 3}px`;
        mystyle.height = `${height + 3.5}px`;
    }

    //多用于耗时计算的缓存，也可以省去不必要操作
    // const memoVal = useMemo(() => {
    // }, [x, y, width, height]);

    const onChangeRect = (rect) => {
        if(!divEle.current){
            return;
        }
        divEle.current.style.left = `${rect.x - 1.9}px`;
        divEle.current.style.top = `${rect.y - 1.5}px`;
        divEle.current.style.width = `${rect.width + 3}px`;
        divEle.current.style.height = `${rect.height + 3.5}px`;
    }



    // eslint-disable-next-line no-unused-vars
    const changeContent = (target, rect) => {
        target.style.left = `${rect.x}px`;
        target.style.top = `${rect.y}px`;
        target.style.width = `${rect.width}px`;
        target.style.height = `${rect.height}px`;
    }

    // eslint-disable-next-line no-unused-vars
    function getDisplayRect(rect) {
        return {
            left: `${rect.x - 1.9}px`,
            top: `${rect.y - 1.5}px`,
            width: `${rect.width + 3}px`,
            height: `${rect.height + 3.5}px`,
        }
    }

    const stopEvent = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    let isDrag = false;
    let dragX = 0;
    let dragY = 0;

    window.onkeydown = (e) => {
        if (state.refObj && divEle.current && e.keyCode === 8) {
            deleteEle();
        }
    };

    window.addEventListener('mouseup', () => {
        isDrag = false;
        dragX = 0;
        dragY = 0;
    }, true);

    window.addEventListener('mousemove', (e) => {
        if (!isDrag || !props.ctrlData.refObj ||!selEle) {
            return;
        }
        let dx = e.clientX - dragX;
        let dy = e.clientY - dragY;
        dragX = e.clientX;
        dragY = e.clientY;
        if (dx === 0 && dy === 0) {
            return;
        }
        let rect = { ...props.ctrlData.rect }
        rect.x += dx;
        rect.y += dy;
        onChangeRect(rect);
        props.ctrlData.rect = { ...rect };
        props.ctrlData.refObj.data.rect = { ...rect }
        selEle.style.left = `${rect.x}px`;
        selEle.style.top = `${rect.y}px`;
        selEle.style.width = `${rect.width}px`;
        selEle.style.height = `${rect.height}px`;
    }, true);

    if (props.ctrlData.autoPress) {
        isDrag = true;
        dragX = props.ctrlData.hit.x;
        dragY = props.ctrlData.hit.y;
    }


    const deleteEle = () => {
        props.ctrlData.refObj.data.isDelete = true;
        props.sortMediaElements();
        props.hitTestOperate({
            ctrlData: {
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
        })
        selEle = null;
        props.ctrlData.refObj = null;
        // selEle.parentElement.removeChild(selEle)
        divEle.current = null;
    }

    return (
        //contentEditable="true"
        //pointer-events: none; 忽略所有鼠标事件
        <div autoFocus ref={divEle}
            tabIndex={0}
            user-select='none'
            webkit-user-select="none"
            style={{
                ...mystyle,
                border: '2.2px solid #1890ff',
                contentEditable: true,
                zIndex: 99999
            }}
            onClick={stopEvent}
            onMouseDown={(e) => {
                stopEvent(e);
                if (display === 'block' && state.refObj) {
                    dragX = e.clientX;
                    dragY = e.clientY;
                    isDrag = true;
                    props.ctrlData.refObj.data.rect = { ...props.ctrlData.rect }
                    props.ctrlData.hit = getOperatePositon(e.clientX, e.clientY)
                }
            }}
            onMouseMove={(e) => {
                stopEvent(e);
            }}
            onMouseUp={(e) => {
                e.stopPropagation();
                e.preventDefault();
                isDrag = false;
                dragX = 0;
                dragY = 0;
            }}
        >
            <div style={{
                position: 'absolute',
                right: '-3.7px',
                bottom: '-3.8px',
                width: '6px',
                height: '6px',
                border: '1px solid #ffffff',
                backgroundColor: '#1890ff',
                overflow: 'visible',
                pointerEvents: 'none'
            }}>
            </div>
        </div>
    );
}

MediaController.propTypes = {
    ctrlData: PropTypes.object.isRequired,
    hitTestOperate: PropTypes.func.isRequired,
    sortMediaElements: PropTypes.func.isRequired,
}

export default connect(
    state => {
        return {
            ctrlData: state.ctrlData,
        }
    },
    { sortMediaElements, hitTestOperate }
)(MediaController);

//export default MediaController;