import React from 'react'
import { Formik, Form, Field, getIn, ErrorMessage } from 'formik'
import Button from '../atoms/Button'
import ListFormInput from '../molecules/ListFormInput'
import {createArgument} from '../../data/api/Api'
import * as Yup from 'yup'
import Tooltip from '../atoms/Tooltip'

import './styles/CreateArgs.scss'

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
  sourceList: Yup.string()
    .notRequired()
})

const fieldDecoratorValues = {
  statement: {
    label: 'Statement',
    placeholder:'Give a short overview of your argument.'
  },
  circumstance: {
    label: 'Current circumstance',
    placeholder: 'Describe the current situation surrounding your argument.'
  },
  action: {
    label: 'Action',
    placeholder: 'What action do you recommend happens.'
  },
  newCircumstance: {
    label: 'New circumstance',
    placeholder: 'What will the action you suggest result in?'
  },
  goal: {
    label: 'Achieving the goal of',
    placeholder: 'What goal would the new situation achieve?'
  },
  value: {
    label: 'Promoting values of',
    placeholder: 'What values are now more prevalent due to your suggested action?'
  },
}

const getStyles = (form, field) => {
  if (form.touched[field.name] && form.errors[field.name]) {
    return {
      background: '#ffe6e6' // light red
    }
  }
}

const CustomInput = ({field, form}) => {
  return <div>
    <label htmlFor={field.name}>{fieldDecoratorValues[field.name].label}</label>
    <ErrorMessage name={field.name} component={CustomErrorMessage}/>
    <br/>
    <textarea 
    className='Create-Arg-Input'
    placeholder={fieldDecoratorValues[field.name].placeholder} {...field} 
    style={getStyles(form, field)} />
  </div>
}

const CustomErrorMessage = (error) => {
  return (
    <Tooltip 
      text={error.children}
      style={{color: '#fb6767'}}
      type='error'
    />
  )
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
            <Field 
              component={CustomInput}
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
        <Button icon="back" onClick={confirmLeave}/>
        <Button icon="submit" disabled={isSubmitting}>
        </Button>
      </Form>
    )
  }

  const confirmLeave = () => {
    if (window.confirm('If you leave, you will loose any content you have added below. Are you sure you want to leave?')) {
        props.history.goBack()
    }
  }
  
  return (
    <div>
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
        initialErrors={{}}
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
        {({ isSubmitting , values, errors}) => renderFormElems(isSubmitting, values, errors)}
      </Formik>

    </div>
  )
}

export default CreateArgument