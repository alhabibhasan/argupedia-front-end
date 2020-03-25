import React, {useState, useEffect} from 'react'
import Button from '../atoms/Button'

import './Styles/CreateArgs.scss'
import {getSchemes} from '../../data/motivationSchemas'
import { DropdownList } from '../atoms/DropdownList'
import SourceList from '../molecules/SourceList/SourceList'
import { camelize } from '../../util/formatting'

const ArgumentForm = (props) => {
  const argStatusValues = {
    'SUCCESS' : 'done',
    'NOT_ATTEMPTED' : 'submit',
    'ERROR' : 'error'
  }

  const [argumentStatus, setArgumentStatus] = useState('NOT_ATTEMPTED')
  const [argumentStatusMessage, setArgumentStatusMessage] = useState('')
  const [argumentBasis, setArgumentBasis] = useState(props.arg && props.arg.argumentBasis || '')
  const [statement, setStatement] = useState(props.arg && props.arg.statement || '')
  const [argumentSchemes, setArgumentSchemes] = useState([])
  const [sourceList, setSourceList ] = useState(props.arg && props.arg.sourceList || [])
  const [form, setForm] = useState(props.arg || {})

  /**
   * Loads the argument basis' with fields etc. from the db
   */
  useEffect(() => {
    getSchemes()
    .then(schemes => {
      setArgumentSchemes(schemes)
    })
  }, [props, props.arg])

  /**
   * ran when the argument basis changes, it is in charge of updating the form so it reflects the fields
   * included in the current argument basis' fields.
   */
  useEffect(() => {
    if (argumentSchemes && argumentBasis !== 'default') {
      let selectedBasisFields = argumentSchemes.filter(scheme => scheme.label === argumentBasis)[0]
      if (selectedBasisFields) {
        let updatedForm = {}
        selectedBasisFields.fields.forEach(field => {
          updatedForm[camelize(field)] = ''
        })
        setForm(updatedForm)
      }
    }
  }, [argumentBasis])

  /**
   * This is ran when an an argument is passed in. it ensure that the form is populated using data from the selected basis and the 
   * data from the existing argument.
   */
  useEffect(() => {
    if (argumentSchemes.length && argumentBasis !== 'default' && props.arg) {
      let selectedBasisFields = argumentSchemes.filter(scheme => scheme.label === argumentBasis)[0]
      let populatedForm = {}
      selectedBasisFields.fields.forEach(field => {
        let camelFieldName = camelize(field)
        populatedForm[camelFieldName] = props.arg[camelFieldName]
      })
      setForm(populatedForm)
    }
  }, [props.arg, argumentBasis, argumentSchemes])

  const updateForm = (field, value) => {
    let formCopy = JSON.parse(JSON.stringify(form))
    formCopy[camelize(field)] = value
    setForm(formCopy)
  }

  const formSubmit = (evt) => {
    evt.preventDefault()
    form['statement'] = statement
    form['argumentBasis'] = argumentBasis
    form['sourceList'] = sourceList
    // need to do validation
    props.onSubmit(form, setArgumentStatus, setArgumentStatusMessage)
  }

  const getBasisSpecificFields = () => {
    if (argumentSchemes) {
      let selectedBasisFields = argumentSchemes.filter(scheme => scheme.label === argumentBasis)[0]
      if (selectedBasisFields) {
        let formElements = selectedBasisFields.fields.map((field, index) => {
          return (
            <p key={index}>
              <label htmlFor={field}>
                {field}
                <br/>
                <textarea value={form[camelize(field)]} onChange={e => updateForm(field, e.target.value)}/>
              </label>
            </p>
          )
        })
        return formElements
      }
    }
  }
  
  const renderForm = () => {
    let otherFields = getBasisSpecificFields()
    let formElem = <form onSubmit={e => formSubmit(e)}>
      <p>
        <label htmlFor='statement'>Statement
          <br/>
          <textarea name='statement' value={statement} onChange={e => setStatement(e.target.value)}/>
        </label>
      </p>
      {props.edit ? '' : 
        <div>
          <label>
            Argument Scheme
            <DropdownList valuesToRender={argumentSchemes} selectedValue={argumentBasis} setSelectedValue={setArgumentBasis}/>
          </label>
        </div>
      }
      {otherFields}
      {argumentBasis !== 'default' ?  
        <div>
          <SourceList label={'Sources'} list={JSON.stringify(sourceList)}
            updateList={stringifiedList => setSourceList(JSON.parse(stringifiedList))}/>
          <div className="Form-Buttons" onClick={e => formSubmit(e)}>
                <Button icon={argStatusValues[argumentStatus]}/>
          </div>
        </div> 
        : 
        ''}
      <br/>
      {argumentStatusMessage}
    </form>
    return formElem
  }

  return <div className='Create-Arg-Form'> {renderForm()} </div>
}

export default ArgumentForm