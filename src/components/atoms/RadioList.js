import React, {useState, useEffect} from 'react'

const RadioList = (props) => {
    const [selected, setSelected] = useState()

    useEffect(() => {
        props.setSelectedValue(selected)
    }, [selected])

    const renderFields = () => {
        return Object.keys(props.valuesToRender).map((property, index) => {
            return (
                <div key={index}>
                    <label htmlFor={property}>
                    <input type="radio"
                        name='fieldToAttack' 
                        value={property} 
                        onChange={(e) => setSelected(e.target.value)}
                    /> 
                    {props.valuesToRender[property].label}
                    </label>
                </div>
                )
            })
    }

    return (
        <div>
            <div style={{display: 'inline-flex'}}>
                {renderFields()}  
            </div>
        </div>
        )
}

export {RadioList}