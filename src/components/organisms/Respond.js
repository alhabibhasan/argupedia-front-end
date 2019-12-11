import React, {useState, useEffect} from 'react'
import { DropdownList } from '../atoms/DropdownList'
import motivationSchemas from '../../data/motivationSchemas'
import ArgumentForm from './ArgumentForm'
import { ResponseSchema } from '../../data/validators/ArgumentSchema'
import { createResponse } from '../../data/api/Api'
import {withRouter} from 'react-router-dom'
import { waitThenRedirectTo } from '../../util/redirect'
import { readArgument } from '../../data/routes'
import argumentFields from '../../data/argumentFields'

const Response = (props) => {
    const [selectedPoint, setSelectedPoint] = useState()
    const [criticalQuestion, setCriticalQuestion] = useState()

    const hasSelectedPoint = () => selectedPoint && selectedPoint != 'default'

    const hasCriticalQuestion = () => criticalQuestion && criticalQuestion != 'default'

    const renderCriticalQuestions = () => {
        let copiedSchemes = JSON.parse(JSON.stringify(motivationSchemas))
        let currentCategory = copiedSchemes.filter(schema => schema.id === props.root.argumentBasis)[0]
        if (!currentCategory.label.includes('Recommended')) {
            copiedSchemes[copiedSchemes.indexOf(currentCategory)].label = currentCategory.label + ' - Recommended '
        }
        return <DropdownList 
                    valuesToRender={copiedSchemes} 
                    setSelectedValue={setCriticalQuestion}
                    categorized={true}
                    categoryOptionsField={'criticalQuestions'}/>
    }

    const getQuestionCategoryLabel = (value) => {
        return motivationSchemas.filter(schema => schema.id === value)[0].label
    }

    const renderSelectedPoint = () => {
        if (hasSelectedPoint(selectedPoint) ) {
            return (
                <div>
                    <div>
                        <div>
                            We recommend using questions from the "{getQuestionCategoryLabel(props.root.argumentBasis)}" list.
                        </div>  
                        {renderCriticalQuestions()}
                    </div>
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
            quote = "\"" + props.root[selectedPoint] + "\" - " + criticalQuestion
        }
        return quote
    }

    const renderResponseForm = () => {
        if (hasSelectedPoint() && hasCriticalQuestion()) {
            return <ArgumentForm 
                schema={ResponseSchema} 
                statement={getQuote()}
                onSubmit={(values, setArgumentStatus, setArgumentStatusMessage) => {
                    let valuesCopy = JSON.parse(JSON.stringify(values))
                    valuesCopy['root'] = false
                    valuesCopy['propertyToRespondTo'] = selectedPoint
                    valuesCopy['rootId'] = props.root.id
                    createResponse(props.root.id, valuesCopy)
                    .then(createdNode => {
                        setArgumentStatus('SUCCESS')
                        setArgumentStatusMessage('Your response was created successfully.')
                        waitThenRedirectTo(props.history, readArgument.use + props.root.id, 1500)
                    })
                    .catch(() => {
                        setArgumentStatus('ERROR')
                        setTimeout(() => {
                            setArgumentStatus('NOT_ATTEMPTED')
                        }, 1500)
                        setArgumentStatusMessage('Oops, there was an error, please try again. If it persists, contact the admin via admin@argupedia.com.')
                    })
                }}/>
        }
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