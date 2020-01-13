import React, {useState} from 'react'
import { Formik, Form, Field } from 'formik'
import Button from '../atoms/Button'
import ListFormInput from '../molecules/ListFormInput'
import RadioFormInput from '../molecules/DropdownFormInput'
import {ArgumentSchema} from '../../data/validators/ArgumentSchema'
import {ArgumentFormInput} from  '../molecules/ArgumentFormInput'
import {confirmLeave} from '../../util/redirect'
import motivationSchemas from '../../data/motivationSchemas'

import './styles/CreateArgs.scss'

const ArgumentForm = (props) => {
  const argStatusValues = {
    'SUCCESS' : 'done',
    'NOT_ATTEMPTED' : 'submit',
    'ERROR' : 'error'
  }

  const [argumentStatus, setArgumentStatus] = useState('NOT_ATTEMPTED')
  const [argumentStatusMessage, setArgumentStatusMessage] = useState('')

  const renderFormElems = (values, errors) => {
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
      } else if (value === 'argumentBasis') {
        return (<div key={index}>
            <RadioFormInput fieldName='argumentBasis' renderedProperties={motivationSchemas}/>
            <hr/>
          </div>)
      } else {
        return (
          <div key={index}>
            <Field 
              component={ArgumentFormInput}
              type="text" 
              name={value} 
            />
          </div>
        )
      }
    })

    return (
      <Form>
        {inputFields}
        <div className="Form-Buttons">
          {props.hideBack ? 
            ''
            :
            <Button icon="back" onClick={() => confirmLeave(props.history)}/> 
          }
          <Button icon={argStatusValues[argumentStatus]}/>
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
        argumentBasis: '' || props.basis,
        circumstance: '' || props.circumstance,
        action:''|| props.action,
        newCircumstance: '' || props.newCircumstance,
        goal:'' || props.goal,
        value:'' || props.value, 
        sourceList: '' || props.sourceList}}
      enableReinitialize={true}
      validationSchema={props.schema ? props.schema : ArgumentSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true)
        props.onSubmit(values, setArgumentStatus, setArgumentStatusMessage)
      }}
      >
        {({values, errors}) => renderFormElems(values, errors)}
      </Formik>
    </div>
  )
}

export default ArgumentForm