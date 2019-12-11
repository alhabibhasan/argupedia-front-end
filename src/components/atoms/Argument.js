import React from 'react'
import styled from 'styled-components'
import argumentFields from '../../data/argumentFields'
import { ExpandCollapse } from './ExpandCollapse'

const Arg = styled.div`
    text-align: left;
`
const Label = styled.div`
    font-weight: 600;
`

const Argument = (props) => {
    let fields = argumentFields.map(field => {
        if (field.id === 'sourceList') {
            let sources = JSON.parse(props.arg[field.id]).map((source, index) => {
                return <div>
                    [{index + 1}] {source}
                </div>
            })
            let show = <Label>Show Sources +</Label>
            let hide = <Label>Hide Sources +</Label>
            return (
                <ExpandCollapse
                    style={{textAlign: 'left'}} 
                    openIcon={show}
                    closeIcon={hide} 
                    render={sources}/>
            )
        }
        return (
            <Arg>
                <Label>{field.label}</Label>
                {props.arg[field.id]}
            </Arg>
        )
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