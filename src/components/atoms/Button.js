import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

const Btn = styled.button`
    border: 0;
    font-size: 28pt;
    font-weight: 100;
    background: none;
`

const Button = (props) => {
    const getButtonText = () => {
        console.log(props.icon)
        switch (props.icon) {
            case 'back': return <span>&times;</span>
            case 'submit': return <span style={{fontSize: '22pt'}}>&rarr;</span>
            case 'add': return <span>+</span>
            default: return 'Default Button Text'
        }
    }
    const handleClick = (e) => {
        if (props.onClick) {
            props.onClick(e)
        }
    }
    return (
        <Btn className={props.className} type={props.icon === 'submit' ? 'submit' : 'button'} onClick={e => handleClick(e)}>
            {getButtonText()}
        </Btn>
    )
}

export default withRouter(Button)