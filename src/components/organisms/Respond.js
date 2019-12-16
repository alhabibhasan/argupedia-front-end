import React, {useState, useEffect} from 'react'
import { DropdownList } from '../atoms/DropdownList'
import motivationSchemas from '../../data/motivationSchemas'
import ArgumentForm from './ArgumentForm'
import { ResponseSchema } from '../../data/validators/ArgumentSchema'
import { createResponse } from '../../data/api/Api'
import {withRouter} from 'react-router-dom'
import argumentFields from '../../data/argumentFields'

const defaultSuccessMessage = 'Your response was created successfully.'

const Response = (props) => {
    const [selectedPoint, setSelectedPoint] = useState()
    const [criticalQuestion, setCriticalQuestion] = useState()

    const hasSelectedPoint = () => selectedPoint && selectedPoint != 'default'

    const hasCriticalQuestion = () => criticalQuestion && criticalQuestion != 'default'

    const renderCriticalQuestions = () => {
        if (!hasSelectedPoint()) return;
        let copiedSchemes = JSON.parse(JSON.stringify(motivationSchemas))
        let currentCategory = copiedSchemes.filter(schema => schema.id === props.root.argumentBasis)[0]
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
                        We recommend using questions from the "{getQuestionCategoryLabel(props.root.argumentBasis)}" list.
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
            quote = "\"" + props.root[selectedPoint] + "\" - " + criticalQuestion
        }
        return quote
    }

    const renderResponseForm = () => {
        if (!hasSelectedPoint() || !hasCriticalQuestion()) return;

        return <ArgumentForm
            hideBack={props.hideBack} 
            schema={ResponseSchema} 
            statement={getQuote()}
            onSubmit={(values, setArgumentStatus, setArgumentStatusMessage) => {
                let valuesCopy = JSON.parse(JSON.stringify(values))
                valuesCopy['root'] = false
                valuesCopy['propertyToRespondTo'] = selectedPoint
                valuesCopy['rootId'] = props.root.id
                createResponse(props.root.id, valuesCopy)
                .then(() => {
                    setArgumentStatus('SUCCESS')
                    setArgumentStatusMessage(props.successMessage ? props.successMessage : defaultSuccessMessage)
                    setTimeout(() => {
                        setArgumentStatus('NOT_ATTEMPTED')
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                        setTimeout(() => {
                            props.updateArgument()
                        }, 1000)
                    }, 1000)
                })
                .catch((err) => {
                    console.log(err)
                    setArgumentStatus('ERROR')
                    setTimeout(() => {
                        setArgumentStatus('NOT_ATTEMPTED')
                    }, 1500)
                    setArgumentStatusMessage('Oops, there was an error, please try again. If it persists, contact the admin via admin@argupedia.com.')
                })
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