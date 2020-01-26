import React from 'react'
import {Field} from 'formik';
import {DropdownList} from '../../atoms/DropdownList'
import { ErrorMessage } from 'formik'
import {tooltipErrorRed} from '../../../util/colours'
import Tooltip from '../../atoms/Tooltip'


const fieldDecoratorValues = {
    argumentBasis: {
        label: 'What is the basis of your argument?'
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


const DropdownFormInput = (props) => {
    return (
        <Field name={props.fieldName} id={props.fieldName} type="text">
        {({ field: { value }, form: { setFieldValue } }) => (
            <div>
                <label htmlFor={props.fieldName}>{fieldDecoratorValues[props.fieldName].label}</label>
                <ErrorMessage name={props.fieldName} component={CustomErrorMessage}/>                
                <DropdownList 
                    valuesToRender={props.renderedProperties}
                    selectedValue={value}
                    setSelectedValue={value => setFieldValue(props.fieldName,value)}/>
            </div>
        )}
        </Field>
    )
}

export default DropdownFormInput