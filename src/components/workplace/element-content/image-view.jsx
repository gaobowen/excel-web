import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sortMediaElements, hitTestOperate } from '../../../redux/workplace/actions'
import { zIndexEventListener } from '../current-operate'
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
    const [data, setData] = useState(props.data);
    const divEle = useRef(null);
    
    const onChangeRect = (rect) => {
        props.data.rect = { ...rect }
        props.data.location = rect
        divEle.current.style.left = `${rect.x}px`;
        divEle.current.style.top = `${rect.y}px`;
        divEle.current.style.width = `${rect.width}px`;
        divEle.current.style.height = `${rect.height}px`;
    }


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
            //console.log(wid, heig)
            //console.log(img.width, img.height)
        }

    }

    if (props.data && props.data.rect) {
        mystyle.left = `${props.data.rect.x}px`
        mystyle.top = `${props.data.rect.y}px`
        mystyle.width = `${props.data.rect.width}px`;
        mystyle.height = `${props.data.rect.height}px`;
    }

    function setRect(rect) {
        props.data.rect = { ...rect }
        setData({ ...props.data })
    }

    function setOriginalSize() {
        props.data.rect.width = props.data.originalSize.width;
        props.data.rect.height = props.data.originalSize.height;
        setData({ ...props.data })
    }
    
    console.log('ImageView render', props)
    return (
        <div style={{ ...mystyle }}
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
                divEle.current.style.zIndex = 9990;
                props.sortMediaElements();
                zIndexEventListener.callback();
                props.hitTestOperate({
                    ctrlData: {
                        refObj: {
                            current: divEle.current,
                            divRef: divEle,
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
