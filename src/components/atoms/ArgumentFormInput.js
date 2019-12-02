import React from 'react'
import { ErrorMessage } from 'formik'
import {tooltipErrorRed, formInputErrorRed} from '../../util/colours'
import Tooltip from '../atoms/Tooltip'

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


const CustomErrorMessage = (error) => {
    return (
      <Tooltip 
        text={error.children}
        style={{color: tooltipErrorRed}}
        type='error'
      />
    )
  }

const ArgumentFormInput = ({field, form}) => {
    return (<div>
            <label htmlFor={field.name}>{fieldDecoratorValues[field.name].label}</label>
            <ErrorMessage name={field.name} component={CustomErrorMessage}/>
            <br/>
            <textarea 
            className='Create-Arg-Input'
            placeholder={fieldDecoratorValues[field.name].placeholder} {...field} 
            style={getStyles(form, field)} />
        </div>)
}

export {
    ArgumentFormInput
}