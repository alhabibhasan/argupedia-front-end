import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

import {tooltipErrorRed} from '../../util/colours'
import {MdErrorOutline} from 'react-icons/md'

const Btn = styled.button`
    border: 0;
    font-size: 30pt;
    font-weight: 240;
    background: none;
    color: black;
`

const Button = (props) => {
    const getButtonText = () => {
        switch (props.icon) {
            case 'back': return <span>&times;</span>
            case 'error': return <span style={{color: tooltipErrorRed, fontSize: '22pt', marginBottom: '5pt'}} > <MdErrorOutline/></span>
            case 'submit': return <span style={{fontSize: '22pt'}}>&rarr;</span>
            case 'add': return <span>&#43;</span>
            case 'done': return <span style={{fontSize: '22pt', fontWeight: '250', color: '#adecad'}}>&#10003;</span>
            default: return <span>{props.text}</span>
        }
    }

    return (
        <Btn className={props.className} 
            style={props.style}
            type={props.icon === 'submit' ? 'submit' : 'button'} 
            onClick={e => props.onClick && props.onClick(e)}
            onBlur={e => props.onBlur && props.onBlur(e)}
            disabled={props.disabled}>
            {getButtonText()}
        </Btn>
    )
}

export default withRouter(Button)