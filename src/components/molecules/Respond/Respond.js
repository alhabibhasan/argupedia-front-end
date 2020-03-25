import React, {useState, useEffect} from 'react'
import { DropdownList } from '../../atoms/DropdownList'
import ArgumentForm from '../../organisms/ArgumentForm'
import {withRouter} from 'react-router-dom'
import {sendCreateResponseRequest} from '../../../data/argRequests'
import {getSchemes, getDefaultCriticalQuestions} from '../../../data/motivationSchemas'

const defaultSuccessMessage = 'Your response was created successfully, this form will close automatically.'

const Response = (props) => {
    const [criticalQuestion, setCriticalQuestion] = useState('default')
    const [criticalQuestions, setCriticalQuestions] = useState(getDefaultCriticalQuestions())

    const hasCriticalQuestion = () => criticalQuestion && criticalQuestion !== 'default'

    useEffect(() => {
        getSchemes()
        .then(schemes => {
            let schema = schemes.filter(schema => schema.label === props.parent.argumentBasis)[0]
            if (schema && schema.criticalQuestions) setCriticalQuestions(schema.criticalQuestions)
        })
    },[props.parent.argumentBasis])

    const renderCriticalQuestions = () => {
        if (criticalQuestion) {
        return (<div>
                    <div>
                        Select a critical question:
                    </div>
                    <DropdownList 
                        valuesToRender={criticalQuestions} 
                        setSelectedValue={setCriticalQuestion}
                        categoryOptionsField={'criticalQuestions'}/>
                </div>)
        }
    }

    const getQuote = () => {
        let quote = ''
        if (hasCriticalQuestion()) {
            quote = criticalQuestion
        }
        return quote
    }

    const renderResponseForm = () => {
        if (!hasCriticalQuestion()) return;

        return <ArgumentForm
            statement={getQuote()}
            onSubmit={(values, setArgumentStatus, setArgumentStatusMessage) => {
                let metadata = {
                    updateArgument: props.updateArgument,
                    successMessage: props.successMessage,
                    parentId: props.parent.id,
                    criticalQuestion: criticalQuestion,
                    defaultSuccessMessage: defaultSuccessMessage,
                    toggleOption: props.metadata.toggleOption
                }

                let valuesCopy = JSON.parse(JSON.stringify(values))
                valuesCopy['root'] = false
                valuesCopy['criticalQuestion'] = criticalQuestion
                valuesCopy['parentId'] = props.parent.id
                valuesCopy['uid'] = props.user.uid
                sendCreateResponseRequest(valuesCopy, setArgumentStatus, setArgumentStatusMessage, metadata)
            }}/>
    }

    return (
        <div>
            <div className='Inherited-Points'>
                {renderCriticalQuestions()}
                {renderResponseForm()}
            </div> 
        </div>
    )
}

export default withRouter(Response)