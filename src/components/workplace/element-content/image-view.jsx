import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sortMediaElements, hitTestOperate } from '../../../redux/workplace/actions'
import { zIndexEventListener, getOperatePositon } from '../current-operate'
/*
data:{
    fileType: 'img',
    src: e.target.result,
    location: pos,
    zIndex: 9990,
    autoSeleted: true
}
*/

function ImageView(props) {
    //console.log(props)//方法已挂载
    const [id, setId] = useState(props.data.id);
    const [data, setData] = useState(props.data);
    const [zidx, setZidx] = useState(props.data.zIndex);
    const [target, setTarget] = useState(null);
    const [rect, setRect] = useState(props.data.reat);
    const [selEle, setSelEle] = useState(null);
    const divEle = useRef(null);


    const onChangeRect = (target, rect) => {
        //已过期的元素，不起效果
        //setRect({...rect})
        //这里的props.data.id 不一定= divEle.current.id
        //divEle.current可能为上一个元素，此字段只在重新渲染时才更新
        if (!selEle) {
            return;
        }

        selEle.style.left = `${rect.x}px`;
        selEle.style.top = `${rect.y}px`;
        selEle.style.width = `${rect.width}px`;
        selEle.style.height = `${rect.height}px`;

    }

    const onChangeRectRef = useRef(onChangeRect);

    const mystyle = {
        backgroundColor: '#00000088',
        position: 'absolute',
        left: `${props.data.location.x}px`,
        top: `${props.data.location.y}px`,
        zIndex: props.data.zIndex,
    }

    if (!props.data.rect) {
        let img = new Image();
        img.src = props.data.src;
        img.onload = () => {
            let wid = img.width;
            let heig = img.height;
            props.data.originalSize = {
                width: wid,
                height: heig
            }
            //等比缩小
            if (wid > 500) {
                let ratio = heig / wid;
                wid = 500;
                heig = ratio * 500;
            }
            if (heig > 500) {
                let ratio = wid / heig;
                heig = 500;
                wid = ratio * 500;
            }
            props.data.rect = { x: 0, y: 0 }
            props.data.rect.x = props.data.location.x - wid / 2;
            props.data.rect.y = props.data.location.y - heig / 2;
            props.data.rect.width = wid;
            props.data.rect.height = heig;
            props.data.location.x = props.data.rect.x;
            props.data.location.y = props.data.rect.y;

            setData({ ...props.data })
        }

    }

    if (props.data && props.data.rect) {
        mystyle.left = `${props.data.rect.x}px`
        mystyle.top = `${props.data.rect.y}px`
        mystyle.width = `${props.data.rect.width}px`;
        mystyle.height = `${props.data.rect.height}px`;
    }


    // eslint-disable-next-line no-unused-vars
    function setOriginalSize() {
        props.data.rect.width = props.data.originalSize.width;
        props.data.rect.height = props.data.originalSize.height;
        setData({ ...props.data })
    }

    //console.log('ImageView render', props)
    return (
        <div
            id={props.data.id}
            style={{ ...mystyle }}
            ref={divEle}
            οndragstart="return false;"
            draggable="false"
            onClick={e => {
                e.stopPropagation();
                e.preventDefault();
            }}
            onMouseDown={event => {
                event.stopPropagation();
                event.preventDefault();
                props.data.zIndex = 9990;
                setZidx(9990);
                props.sortMediaElements();
                zIndexEventListener.callback();
                setTarget(event.target)
                let sel = document.getElementById(props.data.id)
                sel.style.zIndex = 9990;
                setId(props.data.id)
                props.hitTestOperate({
                    ctrlData: {
                        refObj: {
                            id: props.data.id,
                            current: divEle.current,
                            divRef: divEle,
                            onChangeRect,
                            data: props.data,
                            onChangeRectRef,
                        },
                        eleType: 'media',
                        hit: getOperatePositon(event.clientX, event.clientY),
                        rect: {
                            r: 0,
                            ...props.data.rect
                        },
                        autoPress: true,
                    }
                });

            }}
            onMouseUp={event => {
                setData(props.data)
                event.stopPropagation();
                event.preventDefault();
            }}
            onLoad={() => {
                if (props.data.autoSeleted) {
                    props.data.autoSeleted = false;
                    props.hitTestOperate({
                        ctrlData: {
                            refObj: {
                                current: divEle.current,
                                onChangeRect,
                                data: props.data
                            },
                            eleType: 'media',
                            hit: {
                                x: props.data.rect.x,
                                y: props.data.rect.y
                            },
                            rect: {
                                r: 0,
                                ...props.data.rect
                            }
                        }
                    })
                }
            }}
        >
            <img src={props.data.src}
                width='100%'
                height='100%'
                οndragstart="return false;"
                draggable="false"
            />
        </div>
    );
}

ImageView.propTypes = {
    data: PropTypes.object.isRequired,
    ctrlData: PropTypes.object.isRequired,
    sortMediaElements: PropTypes.func.isRequired,
    hitTestOperate: PropTypes.func.isRequired,
}

export default connect(
    state => {
        return {
            ctrlData: state.ctrlData,
        }
    },
    { sortMediaElements, hitTestOperate }
)(ImageView);
