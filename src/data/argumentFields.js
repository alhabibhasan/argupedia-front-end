import React from 'react'
import { ExpandCollapse } from '../components/atoms/ExpandCollapse'
import styled from 'styled-components'

const Arg = styled.div`
    text-align: left;
`
const Label = styled.div`
    font-weight: 600;
`

const argumentFields = [
    {
        id: 'circumstance',
        label: 'Current circumstance'
    }, 
    {
        id: 'action',
        label: 'Required action'
    }, 
    {
        id: 'newCircumstance',
        label: 'New circumstance'
    }, 
    {
        id: 'goal',
        label: 'Goal achieved'
    }, 
    {
        id: 'value',
        label: 'Values promoted'
    }, 
    {
        id: 'argumentBasis',
        label: 'Argument based on'
    }, 
    {
        id: 'sourceList',
        label: 'Extra reading',
        render: (sourceList) => {
            let renderedSources = <div>None</div>
            sourceList = JSON.parse(sourceList)
            if (sourceList.length) {
                renderedSources = sourceList.map((source, indexJ) => {
                    return <div key={indexJ}>
                        [{indexJ + 1}] {source}
                    </div>
                })
            }
            let show = <Label>Show Sources +</Label>
            let hide = <Label>Hide Sources +</Label>
            return (
                <div>
                    <ExpandCollapse
                    style={{textAlign: 'left'}} 
                    openIcon={show}
                    closeIcon={hide} 
                    render={renderedSources}/>
                </div>
            )
        }
    },
    {
        id: 'status',
        label: 'Status'
    },
    {
        id: 'updatedAt',
        label: 'Updated at: ',
        render: (date) => {
            return <Arg>
                <Label> Updated at: </Label> 
                {new Date(date).toLocaleString()}
            </Arg>
            
        }
    }
]

export default argumentFields