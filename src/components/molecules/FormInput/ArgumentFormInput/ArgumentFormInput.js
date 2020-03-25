import React from 'react'
import { ErrorMessage } from 'formik'
import {tooltipErrorRed, formInputErrorRed} from '../../../../util/colours'
import Tooltip from '../../../atoms/Tooltip'
import argumentFormConfig from './Config'

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
            <label htmlFor={field.name}>{field.name}</label>
            <ErrorMessage name={field.name} component={CustomErrorMessage}/>
            <br/>
            <textarea 
            className='Create-Arg-Input'
            placeholder={field.name} {...field} 
            style={getStyles(form, field)} />
        </div>)
}

export {
    ArgumentFormInput
}