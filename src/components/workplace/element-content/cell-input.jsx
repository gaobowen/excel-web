import React, { useState } from 'react';
import PropTypes from 'prop-types'


function CellInput(props) {
    //const [data, setData] = useState(null);
    //console.log(props)
    let display = props.ctrlData.eleType === 'cell' ? 'block' : 'none';
    const mystyle = {
        display: display,
        backgroundColor: '#00000000',
        color: '#33333',
        position: 'absolute',
        left: `0px`,
        top: `0px`,
        width: '100%',
        height: '100%',
        opacity: '0'
    }
    let isEditable = false;

    let setEditable = (target, isEdit) => {
        if (isEdit) {
            isEditable = true;
            target.setAttribute("contentEditable", 'plaintext-only');
            target.style.opacity = '1';
            target.focus();
        } else {
            target.blur();
            target.setAttribute("contentEditable", isEditable);
            isEditable = false;
        }
    }

    return (
        <div style={{ ...mystyle, }}
            onDoubleClick={e => {
                setEditable(e.target, true);
            }}
            onBlur={e => {
                isEditable = false;
                e.target.setAttribute("contentEditable", isEditable);
                e.target.style.opacity = '0'
            }}
            onKeyDown={e => {
                if ((e.keyCode || e.which) == 13) {
                    if (isEditable) {
                        //提交数据
                        
                        setEditable(e.target, false);
                    } else {
                        setEditable(e.target, true);
                    }

                }
            }}
        >

        </div>
    );
}

CellInput.propTypes = {
    ctrlData: PropTypes.object.isRequired,
}


export default CellInput;