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
    let fields = argumentFields.map((field, indexI) => {
        if (field.id === 'sourceList') {
            let sourceList = JSON.parse(props.arg[field.id])
            let renderedSources = <div>None</div>
            if (sourceList.length) {
                renderedSources = sourceList.map((source, indexJ) => {
                    return <div key={indexJ}>
                        [{indexI + 1}] {source}
                    </div>
                })
            }
            let show = <Label>Show Sources +</Label>
            let hide = <Label>Hide Sources +</Label>
            return (
                <div key={indexI+field}>
                    <ExpandCollapse
                    style={{textAlign: 'left'}} 
                    openIcon={show}
                    closeIcon={hide} 
                    render={renderedSources}/>
                </div>
            )
        }
        return (
            <Arg key={indexI}>
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