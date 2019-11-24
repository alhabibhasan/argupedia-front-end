import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
    border: 0;
    font-size: 22pt;
    font-weight: 100;
    background: none;
`

const ForwardButton = (props) => {
    return (
        <Btn {...props}>
            &rarr;
        </Btn>
    )
}

export default ForwardButton