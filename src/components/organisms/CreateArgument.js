import React from 'react'
import { Formik, Form, Field, getIn, ErrorMessage } from 'formik'
import ForwardButton from '../atoms/ForwardButton'
import BackButton from '../atoms/BackButton'
import ListFormInput from '../molecules/ListFormInput'
import {createArgument} from '../../data/api/Api'
import * as Yup from 'yup'
import ReactTooltip from 'react-tooltip'

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
})

const valueLabels = {
  statement: 'Statement',
  circumstance: 'Current circumstance',
  action: 'Action',
  newCircumstance: 'New circumstance',
  goal: 'Achieving the goal of',
  value: 'Promoting values of'
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
    <label htmlFor={field.name}>{valueLabels[field.name]}</label>
    <ErrorMessage name={field.name} component={CustomErrorMessage}/>
    <br/>
    <textarea 
    className='Create-Arg-Input'
    placeholder={field.name} {...field} 
    style={getStyles(form, field)} />
  </div>
}

const CustomErrorMessage = (error) => {
  return (
    <span>
      <a data-tip={error.children} style={{color: '#fb6767'}}> &#9888; </a>
      <ReactTooltip place="right" type="error" effect="solid"/>
    </span>
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
          </div>
        )
      }
    })

    return (
      <Form>
        {inputFields}
        <BackButton onClick={confirmLeave}/>
        <ForwardButton type="submit" disabled={isSubmitting}>
        </ForwardButton>
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