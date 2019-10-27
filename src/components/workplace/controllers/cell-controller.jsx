import React from 'react';
import PropTypes from 'prop-types'
import { dragMove } from '../current-operate'
import CellInput from '../element-content/cell-input'
//import { Motion, spring } from 'react-motion';

function CellController(props) {
    dragMove.completed();
    //const [data, setData] = useState(null);
    //console.log(props)
    let display = props.ctrlData.eleType === 'cell' ? 'block' : 'none';
    const mystyle = {
        display: display,
        backgroundColor: '#ffffff00',
        position: 'absolute',
        left: `${props.ctrlData.rect.x - 1.9}px`,
        top: `${props.ctrlData.rect.y - 1.5}px`,
        width: `${props.ctrlData.rect.width + 3}px`,
        height: `${props.ctrlData.rect.height + 3.5}px`,
        overflow: 'visible',
    }

    // function getDisplayRect(props) {
    //     return {
    //         left: `${props.ctrlData.rect.x - 1.9}px`,
    //         top: `${props.ctrlData.rect.y - 1.5}px`,
    //         width: `${props.ctrlData.rect.width + 3}px`,
    //         height: `${props.ctrlData.rect.height + 3.5}px`,
    //     }
    // }



    return (
        //contentEditable="true"
        //pointer-events: none; 忽略所有鼠标事件autoFocus
        <div  style={{
            ...mystyle,
            border: '2.2px solid #1890ff',
            zIndex: 99999,
        }}
            onClick={event => {
                event.stopPropagation();
            }}>
                <CellInput ctrlData={{...props.ctrlData}} />
            <div style={{
                position: 'absolute',
                right: '-3.7px',
                bottom: '-3.8px',
                width: '6px',
                height: '6px',
                border: '1px solid #ffffff',
                backgroundColor: '#1890ff',
                overflow: 'visible',
            }}>
                
            </div>
        </div>

    );
}

CellController.propTypes = {
    ctrlData: PropTypes.object.isRequired,

}

export default CellController;

