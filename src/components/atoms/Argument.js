import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {
    ARGUMENT_FIELDS, 
    EXCLUDED_FIELDS,
    ARGUMENT_START_FORMAT,
    ARGUMENT_END_FORMAT
} from '../../data/argumentFields'
import { camelCaseToSentenceCase, camelize } from '../../util/formatting'
import {getScheme} from '../../data/motivationSchemas'

const Arg = styled.div`
    text-align: left;
    background-color: #f7f7f7;
`
const Label = styled.div`
    font-weight: 600;
`

const Argument = (props) => {
    const [cleanedArg, setCleanedArg] = useState(props.arg)
    const [argumentOrder, setArgumentOrder] = useState([])
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

    useEffect(() => {
        if (cleanedArg.argumentBasis) {
            getScheme(cleanedArg.argumentBasis)
            .then(schemeFields => {
                let desiredOrder = [...ARGUMENT_START_FORMAT, ...schemeFields, ...ARGUMENT_END_FORMAT]
                setArgumentOrder(desiredOrder)
            })
        }
    }, [props.arg])

    const renderArg = () => {
        let argFieldOrderOfRender = Object.keys(cleanedArg)
        if (Boolean(argumentOrder)) {
            argFieldOrderOfRender = argumentOrder
        }

        let renderedArgFields = argFieldOrderOfRender.map((argKey, index) => {
            if (cleanedArg[camelize(argKey)]) {
                let customRender = ARGUMENT_FIELDS.filter(field => field.id === argKey)[0]
                if (Boolean(customRender)) return <div key={index}> {customRender.render(cleanedArg[camelize(argKey)])} </div>
                return <div key={index}>
                    <Label>{camelCaseToSentenceCase(argKey)}</Label>
                    {cleanedArg[camelize(argKey)]}
                </div>
            }
        })

        return <Arg>
            {renderedArgFields}
        </Arg>
    }

    return renderArg()
}

export default Argument