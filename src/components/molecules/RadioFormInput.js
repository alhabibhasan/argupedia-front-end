import React from 'react'
import {Field} from 'formik';
import {RadioList as PointToAttack} from '../atoms/RadioList'

const fieldName = 'radioList'

const RadioFormInput = (props) => {
    return (
        <Field name={fieldName} id={fieldName} type="text">
        {({ field: { value }, form: { setFieldValue } }) => (
            <div>                
                <PointToAttack 
                    valuesToRender={props.renderedProperties}
                    selectedValue={value}
                    setSelectedValue={value => setFieldValue(fieldName,value)}/>
            </div>
        )}
        </Field>
    )
}

export default RadioFormInput