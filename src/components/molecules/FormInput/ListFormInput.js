import React from 'react'
import {Field} from 'formik';
import SourceList from '../SourceList'

const fieldName = 'sourceList'

const ListFormInput = (props) => {
    return (
        <Field name={fieldName} id={fieldName} type="text">
        {({ field: { value }, form: { setFieldValue } }) => (
            <div>
                <SourceList
                    label={props.label}
                    list={value}
                    updateList={stringifiedList => setFieldValue(fieldName, stringifiedList)}
                />
            </div>
        )}
        </Field>
    )
}

export default ListFormInput