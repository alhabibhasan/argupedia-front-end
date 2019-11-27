import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

const Btn = styled.button`
    border: 0;
    font-size: 28pt;
    font-weight: 100;
    background: none;
`

const BackButton = (props) => {
    return (
        <Btn {...props} onClick={(e) => props.onClick(e)}>
            &times;
        </Btn>
    )
}

export default withRouter(BackButton)