import React from 'react'
import PropTypes from 'prop-types'

// https://ding-doc.dingtalk.com/doc#/serverapi3/mrugr3
class DingQrcodeLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "https://login.dingtalk.com/login/qrcode.htm?goto="
        }
    }
    createSrc = () => {
        const { goto, style, href } = this.props.options
        let src = this.state.url + encodeURIComponent(goto)
        src += style ? "&style=" + style : "";
        src += href ? "&href=" + href : "";
        return src
    }
    render() {
        const iframeOption = {
            id: this.props.options.id,
            src: this.createSrc(),
            frameBorder: "0",
            allowtransparency: "true",
            scrolling: "no",
            width: this.props.options.width,
            height: this.props.options.height,
            className: this.props.className
        }
        return (
            <iframe {...iframeOption} />
        )
    }
}

DingQrcodeLogin.propTypes = {
    options: PropTypes.shape({
        id: PropTypes.string,
        goto: PropTypes.string.isRequired,
        style: PropTypes.string,
        href: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
    }),
    className: PropTypes.string
}

DingQrcodeLogin.defaultProps = {
    options: {
        id: "login_container",
        goto: "",
        style: "",
        href: "",
        width: "350px",
        height: "350px",
    },
    className: ''
}

export default DingQrcodeLogin