import React, {useState} from 'react'
import { DropdownList } from '../../atoms/DropdownList'
import motivationSchemas from '../../../data/motivationSchemas'
import ArgumentForm from '../../organisms/ArgumentForm'
import { ResponseSchema } from '../../../data/validators/ArgumentSchema'
import {withRouter} from 'react-router-dom'
import {sendCreateResponseRequest} from './argRequests'
import argumentFields from '../../../data/argumentFields'

const defaultSuccessMessage = 'Your response was created successfully.'

const Response = (props) => {
    const [selectedPoint, setSelectedPoint] = useState()
    const [criticalQuestion, setCriticalQuestion] = useState()

    const hasSelectedPoint = () => selectedPoint && selectedPoint !== 'default'

    const hasCriticalQuestion = () => criticalQuestion && criticalQuestion !== 'default'

    const renderCriticalQuestions = () => {
        if (!hasSelectedPoint()) return;
        let copiedSchemes = JSON.parse(JSON.stringify(motivationSchemas))
        let currentCategory = copiedSchemes.filter(schema => schema.id === props.parent.argumentBasis)[0]
        if (currentCategory && !currentCategory.label.includes('Recommended')) {
            copiedSchemes[copiedSchemes.indexOf(currentCategory)].label = currentCategory.label + ' - Recommended '
        }
        return <DropdownList 
                    valuesToRender={copiedSchemes} 
                    setSelectedValue={setCriticalQuestion}
                    categorized={true}
                    categoryOptionsField={'criticalQuestions'}/>
    }

    const getQuestionCategoryLabel = (value) => {
        let schema = motivationSchemas.filter(schema => schema.id === value)[0]
        if (schema && schema.label) return schema.label
        return 'Category Label not found'
    }

    const renderSelectedPoint = () => {
        if (hasSelectedPoint() ) {
            return (
                <div>
                    <div>
                        We recommend using questions from the "{getQuestionCategoryLabel(props.parent.argumentBasis)}" list.
                    </div>  
                    {renderCriticalQuestions()}
                </div>
            )
        }

        return ( <div>
            Select a point to attack from the list above.
        </div>)
    }

    const getQuote = () => {
        let quote = ''
        if (hasSelectedPoint() && hasCriticalQuestion()) {
            quote = "\"" + props.parent[selectedPoint] + "\" - " + criticalQuestion
        }
        return quote
    }

    const renderResponseForm = () => {
        if (!hasSelectedPoint() || !hasCriticalQuestion()) return;

        return <ArgumentForm
            schema={ResponseSchema} 
            statement={getQuote()}
            onSubmit={(values, setArgumentStatus, setArgumentStatusMessage) => {
                let metadata = {
                    updateArgument: props.updateArgument,
                    successMessage: props.successMessage,
                    parentId: props.parent.id,
                    selectedPoint: selectedPoint,
                    defaultSuccessMessage: defaultSuccessMessage
                }

                let valuesCopy = JSON.parse(JSON.stringify(values))
                valuesCopy['root'] = false
                valuesCopy['propertyToRespondTo'] = selectedPoint
                valuesCopy['parentId'] = props.parent.id
                sendCreateResponseRequest(valuesCopy, setArgumentStatus, setArgumentStatusMessage, metadata)
            }}/>
    }

    return (
        <div>
            <div className='Inherited-Points'>
                <DropdownList multiple={false} valuesToRender={argumentFields}
                    setSelectedValue={setSelectedPoint}/>
                {renderSelectedPoint()}
                {renderResponseForm()}
            </div> 
        </div>
    )
}

export default withRouter(Response)