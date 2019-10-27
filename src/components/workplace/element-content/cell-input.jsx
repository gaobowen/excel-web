import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commitUpdateGridDatas } from '../../../redux/workplace/actions'
import { commitCellData } from '../current-operate'


function CellInput(props) {
    const [data, setData] = useState(props);

    let divEle = useRef();
    let inputRef = useRef();
    //console.log('function CellInput(props) {',props)
    let display = props.ctrlData.eleType === 'cell' ? 'block' : 'none';
    const divStyle = {
        position: '',
        display: display,
        outlineStyle: 'none',
        width: `${props.ctrlData.rect.width}px`,
        height: `${props.ctrlData.rect.height}px`,
        opacity: '0',
        whiteSpace: 'nowrap',
    }

    const inputStyle = {
        left: '0px',
        top: '0px',
        //backgroundColor: '#555',
        borderWidth: '0px',
        outlineStyle: 'none',
        pointerEvents: 'none',
        width: `${props.ctrlData.rect.width - 1}px`,
        height: `${props.ctrlData.rect.height - 1}px`,
        position: 'absolute',
        overflow: 'hidden',
        
    }

    const allStyle = {
        divStyle,
        inputStyle
    }

    const [allStyleData, setAllStyleData] = useState(allStyle);
    const getGridData = () => {
        let key = props.gridDatas['selectedKey'];
        if (key) {
            let grid = props.gridDatas.dic[key].grid;
            return grid[props.ctrlData.coord.rowIdx][props.ctrlData.coord.colIdx];
        }
    }
    let oneGridDataObj = getGridData();
    const [oneGridData, setoneGridData] = useState(oneGridDataObj);
    if (!Object.is(oneGridDataObj, oneGridData)) {
        commitCellData(
            data.ctrlData.coord.rowIdx,
            data.ctrlData.coord.colIdx,
            oneGridData,
        )
        setoneGridData(oneGridDataObj);
    }

    if (!Object.is(data, props)) {
        setData(props);
        setAllStyleData(allStyle);
    }
    //const [allStyleData, setAllStyleData] = useState(allStyle);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = oneGridDataObj.value;
        }
    });

    let setEditState = (isEdit) => {
        if (isEdit) {
            let dstyle = { ...divStyle };
            dstyle.opacity = '1';
            let inStyle = { ...inputStyle };
            inStyle.pointerEvents = 'auto';
            setAllStyleData({
                divStyle: dstyle,
                inputStyle: inStyle
            });
            inputRef.current.readOnly='';
            inputRef.current.focus();
        } else {
            inputRef.current.blur();
            let dstyle = { ...divStyle };
            dstyle.opacity = '0';
            let inStyle = { ...inputStyle };
            inStyle.pointerEvents = 'none';
            inputRef.current.readOnly='readonly';
            setAllStyleData({
                divStyle: dstyle,
                inputStyle: inStyle
            });
        }
    }

    let stopEvent = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    //autoFocus
    return (
        <div ref={divEle} style={allStyleData.divStyle}
            onDoubleClick={() => {
                setEditState(true);
            }}
            onClick={stopEvent}
            onMouseDown={stopEvent}
        >
            {/* {console.log('inputValue.value render = ', inputValue.value)} */}
            {/* {inputValue.value} */}
            {/*ie9 onpropertychange； html5 oninput*/}
            <input
                type={'text'} 
                readOnly="readonly"
                style={{ ...allStyleData.inputStyle }}
                ref={inputRef}
                onChange={e => {
                    //onInput切换controller时会少一个字符
                    oneGridData.value = e.target.value;
                    commitCellData(
                        data.ctrlData.coord.rowIdx,
                        data.ctrlData.coord.colIdx,
                        oneGridData,
                    )
                }}
                onBlur={() => {
                    //console.log('onBlur data.ctrlData.coord.rowIdx', data.ctrlData.coord.rowIdx)
                    commitCellData(
                        data.ctrlData.coord.rowIdx,
                        data.ctrlData.coord.colIdx,
                        oneGridData,
                    )
                }}
                onKeyDown={e => {
                    if (e.keyCode == "13") {
                        setEditState(false);
                    }
                }}
                width='100%' height='100%'>
            </input>
        </div>
    );
}

CellInput.propTypes = {
    ctrlData: PropTypes.object.isRequired,
    gridDatas: PropTypes.object.isRequired,
    commitUpdateGridDatas: PropTypes.func.isRequired,
}

export default connect(
    state => {
        return {
            gridDatas: state.gridDatas,
        }
    },
    { commitUpdateGridDatas }
)(CellInput);