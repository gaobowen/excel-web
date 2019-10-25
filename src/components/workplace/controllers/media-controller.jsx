import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import { dragMove } from '../current-operate'

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

    //const [rect, setRect] = useState(props.ctrlData.rect);
    const divEle = useRef(null);
    let display = props.ctrlData.eleType === 'media' ? 'block' : 'none';
    //if()
    const mystyle = {
        display: display,
        backgroundColor: '#ffffff00',
        position: 'absolute',
        overflow: 'visible',
    }

    if (display === 'block') {
        mystyle.left = `${props.ctrlData.rect.x - 1.9}px`;
        mystyle.top = `${props.ctrlData.rect.y - 1.5}px`;
        mystyle.width = `${props.ctrlData.rect.width + 3}px`;
        mystyle.height = `${props.ctrlData.rect.height + 3.5}px`;
    }

    const onChangeRect = (rect) => {
        divEle.current.style.left = `${rect.x}px`;
        divEle.current.style.top = `${rect.y}px`;
        divEle.current.style.width = `${rect.width}px`;
        divEle.current.style.height = `${rect.height}px`;
    }



    // eslint-disable-next-line no-unused-vars
    function getDisplayRect(props) {
        return {
            left: `${props.ctrlData.rect.x - 1.9}px`,
            top: `${props.ctrlData.rect.y - 1.5}px`,
            width: `${props.ctrlData.rect.width + 3}px`,
            height: `${props.ctrlData.rect.height + 3.5}px`,
        }
    }


    let isDrag = false;
    let dragX = 0;
    let dragY = 0;


    //console.log('render MediaController ')

    return (
        //contentEditable="true"
        //pointer-events: none; 忽略所有鼠标事件
        <div autoFocus ref={divEle}
            user-select='none'
            webkit-user-select="none"
            style={{
                ...mystyle,
                border: '2.2px solid #1890ff',
                contentEditable: true,
                zIndex: 99999
            }}

            onClick={event => {
                event.stopPropagation();
                event.preventDefault();
            }}

            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (display === 'block') {
                    dragMove.start(e.clientX, e.clientY);
                    dragX = e.clientX;
                    dragY = e.clientY
                    isDrag = true;
                    //console.log('onMouseDown')
                    let rect = { ...props.ctrlData.rect }
                    props.ctrlData.refObj.data.rect = { ...rect }

                }

            }}

            onMouseMove={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!isDrag) {
                    return;
                }
                //const { dx, dy } = dragMove.changed(e.clientX, e.clientY);
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
                props.ctrlData.rect = { ...rect }
                onChangeRect({ ...rect });
                props.ctrlData.refObj.data.rect = { ...rect }
                props.ctrlData.refObj.onChangeRect({ ...rect })
                //console.log(dx)
                //setRect(props.ctrlData.rect);
            }}
            onMouseUp={(e) => {
                e.stopPropagation();
                e.preventDefault();
                //dragMove.completed();
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
}

export default MediaController;