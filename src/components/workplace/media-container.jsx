import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ImageView from './element-content/image-view'
import {zIndexEventListener} from './current-operate'


class MediaContainer extends React.Component {

    //优化点：shouldComponentUpdate 比较集合或者选中的sheet是否发生变化。浅比较即可。

    getStamp = () => (new Date().getTime().toString() + parseInt(Math.random() * 100))

    render() {
        zIndexEventListener.callback = ()=>{
            //console.log('MediaContainer',this.props)
            //this.forceUpdate();
        }

        console.log('MediaContainer',this.props)
        let elements = this.props.media.map((val, idx) => {
            return (
                <ImageView data={val} key={idx}  />
            )
        })

        return (
            <>
                {elements}
            </>
        )
    }
}

MediaContainer.propTypes = {
    media: PropTypes.array,
}

export default connect(
    state => {
        let key = state.gridDatas['selectedKey'];
        let media = [];
        if (key) {
            media = state.gridDatas.dic[key].media;
        }
        return { media }
    },
    {}
)(MediaContainer);

