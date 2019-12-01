import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../atoms/Button'
import ListFormInput from '../molecules/ListFormInput'
import {createArgument} from '../../data/api/Api'
import * as Yup from 'yup'
import Tooltip from '../atoms/Tooltip'

import {tooltipErrorRed, formInputErrorRed} from '../../util/colours'
import './styles/CreateArgs.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import redirectTo from '../../util/redirect'
import { readArgument } from '../../data/routes'

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
      background: formInputErrorRed
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
      style={{color: tooltipErrorRed}}
      type='error'
    />
  )
}

const CreateArgument = (props) => {
  const argStatusValues = {
    'CREATED': 'CREATED',
    'NOT_CREATED': 'NOT_CREATED',
    'ERROR':'ERROR'
  }

  const [argumentStatus, setArgumentStatus] = useState(argStatusValues['NOT_CREATED'])
  const [argumentStatusMessage, setArgumentStatusMessage] = useState('')

  const renderSubmitButton = () => {
    const statusToButtonType = {
      'CREATED' : 'done',
      'NOT_CREATED' : 'submit',
      'ERROR' : 'error'
    }
    return <Button icon={statusToButtonType[argumentStatus]}/>
  }

  const renderFormElems = (values, errors) => {
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
        <div className="Form-Buttons">
          <Button icon="back" onClick={confirmLeave}/>
          {renderSubmitButton()}
        </div>
        <div>
          {argumentStatusMessage}
        </div>
      </Form>
    )
  }

  const confirmLeave = () => {
    if (window.confirm('If you leave, you will loose any content you have added below. Are you sure you want to leave?')) {
        props.history.goBack()
    }
  }
  
  return (
    <div className='Create-Arg-Form'>
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
            .then(createdNode => {
              setArgumentStatus(argStatusValues['CREATED'])
              setArgumentStatusMessage('Your argument was created successfully, redirecting you now.')
              console.log(readArgument.use, createdNode.nodeId)
              setTimeout(() => {
                redirectTo(props.history, readArgument.use + createdNode.nodeId)
              }, 1500)
            })
            .catch(() => {
              setArgumentStatus(argStatusValues['ERROR'])
              setTimeout(() => {
                setArgumentStatus(argStatusValues['NOT_CREATED'])
              }, 1500)
              setArgumentStatusMessage('An argument with this statement already exists, please either add to it or reword your one.')
            })
        }}
      >
        {({values, errors}) => renderFormElems(values, errors)}
      </Formik>

    </div>
  )
}

export default CreateArgument