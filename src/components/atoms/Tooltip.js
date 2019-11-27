import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import {MdErrorOutline} from 'react-icons/md'
import {AiOutlineInfoCircle} from 'react-icons/ai'

const Tooltip = (props) => {
    const getIcon = () => {
        switch (props.type) {
            case 'error': return <MdErrorOutline/>
            case 'info': return <AiOutlineInfoCircle/>
            default: return 'Tooltip'
        }
    }

    return (
        <span>
            <a data-tip={props.text} style={props.style}> {getIcon()} </a>
            <ReactTooltip place="right" type={props.type} effect="solid"/>
        </span>
    )
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['error','info','warning']).isRequired
}

export default Tooltip
