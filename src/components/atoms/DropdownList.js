import React, {useState, useEffect} from 'react'

const DropdownList = (props) => {
    const [selected, setSelected] = useState()

    useEffect(() => {
        props.setSelectedValue(selected)
    }, [selected])

    const renderFields = () => {
        return Object.keys(props.valuesToRender).map((property, index) => {
            return <option key={index} value={property}>{props.valuesToRender[property].label}</option>
        })
    }

    return (
        <div>
            <select multiple onChange={(e) => setSelected(e.target.value)}>
                {renderFields()}  
            </select>
        </div>
        )
}

export {DropdownList}