import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ForwardButton from '../atoms/ForwardButton'
import ListFormInput from '../molecules/ListFormInput'
import {createArgument} from '../../data/api/Api'
import * as Yup from 'yup'

const CreateArgumentSchema = Yup.object().shape({
  statement : Yup.string()
    .min(5, 'Too short!')
    .required('Required!'),
  circumstance : Yup.string()
    .min(5, 'Too short!')
    .required('Required!'),
  action : Yup.string()
    .min(5, 'Too short!')
    .required('Required!'),
  newCircumstance : Yup.string()
    .min(5, 'Too short!')
    .required('Required!'),
  goal : Yup.string()
    .min(5, 'Too short!')
    .required('Required!'),
  value : Yup.string()
    .min(5, 'Too short!')
    .required('Required!'),
})

const valueLabels = {
  statement: 'Statement',
  circumstance: 'Current circumstance',
  action: 'Action',
  newCircumstance: 'New circumstance',
  goal: 'Achieving the goal of',
  value: 'Promoting values of'
}

const CreateArgument = (props) => {
  const renderFormElems = (isSubmitting, values) => {
    let formFields = []
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
            <label htmlFor={value}>{valueLabels[value]}</label>
            <br/>
            <Field onBlur={() => props.setFormTouched(true)} type="text" name={value} style={{width: '50%'}}/>
            <ErrorMessage className='error' name={value} component="div" />
          </div>
        )
      }
    })

    return (
      <Form>
        {inputFields}
        <ForwardButton type="submit" disabled={isSubmitting}>
        </ForwardButton>
      </Form>
    )
  }
  
  return (
    <div>
      <h1>Let's get started!</h1>
      <Formik
        initialValues={{ 
          statement: '',
          circumstance: '',
          action:'',
          newCircumstance: '',
          goal:'',
          value:'', 
          sourceList: ''}}
        validationSchema={CreateArgumentSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          let root = true
          createArgument(JSON.parse(JSON.stringify(values)), root)
            .then(nodeId => console.log(nodeId))
            .catch(err => {
              console.log('rejected')
            })
        }}
        
      >
        {({ isSubmitting , values}) => renderFormElems(isSubmitting, values)}
      </Formik>
    </div>
  )
}

export default CreateArgument