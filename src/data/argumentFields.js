import React from 'react'
import { ExpandCollapse } from '../components/atoms/ExpandCollapse'
import styled from 'styled-components'

const Arg = styled.div`
    white-space: pre-wrap;
`
const Label = styled.div`
    font-weight: 600;
`

const DateTime = styled.span`
    font-weight: 300;
`

const ARGUMENT_FIELDS = [
    {
        id: 'updatedAt',
        label: 'Updated at: ',
        render: (date) => {
            return <Arg>
                <DateTime> Updated at: {new Date(date).toLocaleString()}</DateTime>
            </Arg>
            
        }
    },
    {
        id: 'sourceList',
        show: true,
        label: 'Extra reading',
        render: (sourceList = []) => {
            let renderedSources = <div>None</div>
            if (sourceList.length > 0) {
                renderedSources = sourceList.map((source, indexJ) => {
                    return <div key={indexJ}>
                        [{indexJ + 1}] {source}
                    </div>
                })
            }
            let show = <Label>Show Sources +</Label>
            let hide = <Label>Hide Sources -</Label>
            return (
                <div>
                    <ExpandCollapse
                    openIcon={show}
                    closeIcon={hide} 
                    render={renderedSources}/>
                </div>
            )
        }
    },
]

const EXCLUDED_FIELDS = [
    'type', 'id', 'root', 'creatorUID', 
    'createdAt', 'uid', 'deleted', 
    'configCode', '__indexColor', 
    'x', 'y', 'vx', 'vy', 
    'index','validated_uid', 'parentId'
]

const ARGUMENT_START_FORMAT = [
    'statement',
    'criticalQuestion',
]

const ARGUMENT_END_FORMAT = [
    'status',
    'sourceList',
    'updatedAt',
]

export { 
    ARGUMENT_FIELDS, 
    EXCLUDED_FIELDS,
    ARGUMENT_START_FORMAT,
    ARGUMENT_END_FORMAT
}