import React, {useState, useEffect} from 'react'
import { DropdownList } from '../../atoms/DropdownList'
import motivationSchemas from '../../../data/motivationSchemas'
import ArgumentForm from '../../organisms/ArgumentForm'
import { ResponseSchema } from '../../../data/validators/ArgumentSchema'
import {withRouter} from 'react-router-dom'
import {sendCreateResponseRequest} from '../../../data/argRequests'

const defaultSuccessMessage = 'Your response was created successfully.'

const Response = (props) => {
    const [criticalQuestion, setCriticalQuestion] = useState('default')
    const [criticalQuestions, setCriticalQuestions] = useState([])

    const hasCriticalQuestion = () => criticalQuestion && criticalQuestion !== 'default'

    useEffect(() => {
        let schema = motivationSchemas.filter(schema => schema.id === props.parent.argumentBasis)[0]
        setCriticalQuestions(schema.criticalQuestions)
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
            schema={ResponseSchema} 
            statement={getQuote()}
            onSubmit={(values, setArgumentStatus, setArgumentStatusMessage) => {
                let metadata = {
                    updateArgument: props.updateArgument,
                    successMessage: props.successMessage,
                    parentId: props.parent.id,
                    selectedPoint: 'need to derive this from the selected critical qs',
                    defaultSuccessMessage: defaultSuccessMessage,
                    toggleOption: props.metadata.toggleOption
                }

                let valuesCopy = JSON.parse(JSON.stringify(values))
                valuesCopy['root'] = false
                valuesCopy['propertyToRespondTo'] = 'derive this from critical qs'
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