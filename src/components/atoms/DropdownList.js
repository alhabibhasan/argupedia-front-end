import React, {useState, useEffect} from 'react'

const DropdownList = (props) => {
    const [selected, setSelected] = useState('default')

    useEffect(() => {
        props.setSelectedValue(selected)
    }, [selected])

    const renderRegularList = () => {
        return props.valuesToRender.map((property, index) => {
            return <option key={index} value={property.id}>{property.label}</option>
        })
    }

    const renderCategorizedList = () => {
        return props.valuesToRender.map((property, i) => {
            let groupOptions = property[props.categoryOptionsField]
            let label = property.label

            let optionTags = groupOptions.map((opt, index) => {
                return <option key={index} value={opt}>{opt}</option>
            })

            let groupTag = <optgroup key={i} label={label}>
                {optionTags}
            </optgroup>

            return groupTag
        })
    }

    return (
        <div>
            <select multiple={props.multiple} onChange={(e) => setSelected(e.target.value)}>
                <option value='default'>{props.defaultText ? props.defaultText : 'Select a value'}</option>
                {props.categorized ? renderCategorizedList() : renderRegularList()}  
            </select>
        </div>
        )
}

export {DropdownList}