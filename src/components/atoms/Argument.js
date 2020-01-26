import React from 'react'
import styled from 'styled-components'
import argumentFields from '../../data/argumentFields'


const Arg = styled.div`
    text-align: left;
`
const Label = styled.div`
    font-weight: 600;
`

const Argument = (props) => {
    let fields = argumentFields.map((field, indexI) => {
        if (field.render) {
            return <Arg key={indexI}>{field.render(props.arg[field.id])}</Arg>
        } else {
            return (
                <Arg key={indexI}>
                    <Label>{field.label}</Label>
                    {props.arg[field.id]}
                </Arg>
            )
        }
    })
    return (
        <div>
            <Arg>
                <Label>Statement</Label>
                {props.arg.statement}
            </Arg>
            {fields}
        </div>
    )
}

export default Argument