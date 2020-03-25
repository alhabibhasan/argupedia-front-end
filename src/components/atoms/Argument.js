import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {argumentFields, EXCLUDED_FIELDS} from '../../data/argumentFields'
import { camelCaseToSentenceCase } from '../../util/formatting'


const Arg = styled.div`
    text-align: left;
    white-space: pre-wrap;
    background-color: #f7f7f7;
`
const Label = styled.div`
    font-weight: 600;
`

const Argument = (props) => {
    const [cleanedArg, setCleanedArg] = useState(props.arg)
    useEffect(() => {
        let cleanArg = {}
        let currentObjKeys = Object.keys(props.arg)
        currentObjKeys.forEach(key => {
            if (!EXCLUDED_FIELDS.includes(key)) {
                cleanArg[key] = props.arg[key]
            }
        })
        setCleanedArg(cleanArg)
    }, [props.arg])


    let fields = argumentFields.map((field, indexI) => {
        if (field.render && field.show) {
            return <Arg key={indexI}>{field.render(cleanedArg[field.id])}</Arg>
        }
    })

    const renderArg = () => {
        let argKeys = Object.keys(cleanedArg)
        let renderedArgFields = argKeys.map((argKey, index) => {
            let customRender = argumentFields.filter(field => field.id === argKey)[0]
            if (Boolean(customRender)) return <div key={index}> {customRender.render(cleanedArg[argKey])} </div>
            return <div key={index}>
                <Label>{camelCaseToSentenceCase(argKey)}</Label>
                {cleanedArg[argKey]}
            </div>
        })
        return <Arg>
            {renderedArgFields}
        </Arg>
    }

    return renderArg()
}

export default Argument