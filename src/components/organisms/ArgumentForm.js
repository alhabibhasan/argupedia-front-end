import React, {useState} from 'react'
import { Formik, Form, Field } from 'formik'
import Button from '../atoms/Button'
import ListFormInput from '../molecules/ListFormInput'
import {ArgumentSchema} from '../../data/validators/ArgumentSchema'
import {ArgumentFormInput} from  '../atoms/ArgumentFormInput'
import {confirmLeave} from '../../util/redirect'


import './styles/CreateArgs.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const ArgumentForm = (props) => {
  const argStatusValues = {
    'SUCCESS': 'SUCCESS',
    'NOT_ATTEMPTED': 'NOT_ATTEMPTED',
    'ERROR':'ERROR'
  }

  const [argumentStatus, setArgumentStatus] = useState(argStatusValues['NOT_ATTEMPTED'])
  const [argumentStatusMessage, setArgumentStatusMessage] = useState('')

  const renderSubmitButton = () => {
    const statusToButtonType = {
      'SUCCESS' : 'done',
      'NOT_ATTEMPTED' : 'submit',
      'ERROR' : 'error'
    }
    return <Button icon={statusToButtonType[argumentStatus]}/>
  }

  const renderFormElems = (values) => {
    let formFields = []
    // Convert object to array, otherwise we cannot cycle through it easily
    for (var prop in values) {
      if (Object.prototype.hasOwnProperty.call(values, prop)) {
          formFields.push(prop)
      }
    }

    let inputFields = formFields.map((value, index) => {
      if (value === 'sourceList') {
        return <ListFormInput key={index} label='Extra resources'/>
      } else {
        return (
          <div key={index}>
            <Field 
              component={ArgumentFormInput}
              type="text" 
              name={value} 
            />
            {value === 'statement' ? <hr/> : ''}
          </div>
        )
      }
    })

    return (
      <Form>
        {inputFields}
        <div className="Form-Buttons">
          <Button icon="back" onClick={() => confirmLeave(props.history)}/>
          {renderSubmitButton()}
        </div>
        <div>
          {argumentStatusMessage}
        </div>
      </Form>
    )
  }
  
  return (
    <div className='Create-Arg-Form'>
      <Formik
        initialValues={{ 
          statement: '' || props.statement,
          circumstance: '' || props.circumstance,
          action:''|| props.action,
          newCircumstance: '' || props.newCircumstance,
          goal:'' || props.goal,
          value:'' || props.value, 
          sourceList: '' || props.sourceList}}
        validationSchema={ArgumentSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          props.onSubmit(values, argStatusValues, setArgumentStatus, setArgumentStatusMessage)
        }}
      >
        {({values}) => renderFormElems(values)}
      </Formik>

    </div>
  )
}

export default ArgumentForm