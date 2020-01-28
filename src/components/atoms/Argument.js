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
        if (field.render) {
            return <Arg key={indexI}>{field.render(props.arg[field.id])}</Arg>
        } else {
            let parentValue;
            if (props.parent && props.parent[field.id].length > 0) {
                parentValue = (
                        <Arg key={indexI} style={{backgroundColor: '#f8f9fa', fontStyle: 'italic', textAlign: 'center'}}>
                            They said: 
                            <br/>
                            {props.parent[field.id]}
                        </Arg>
                )
            }
            if (props.arg[field.id] && props.arg[field.id].length > 0) {
                return (
                    <Arg key={indexI}>
                        <Label>
                            {
                                field.quotable && props.parent ?
                                    <ExpandCollapse 
                                    openIcon={ field.label + ' +'} 
                                    closeIcon={ field.label + ' -'} 
                                    lazyRender={true} 
                                    render={parentValue}/>
                                :
                                field.label 
                            } 
                            
                        </Label>
                        {props.arg[field.id]}
                    </Arg>
                )
            }
        }
    })
    return (
        <div>
            <Arg>
                {fields}
            </Arg>
        </div>
    )
}

export default Argument