import React, {useState} from 'react'
import { RadioList } from '../atoms/RadioList'

const ResponseForm = (props) => {
    const [selectedPoint, setSelectedPoint] = useState()

    const renderSelectedPoint = () => {
        let selectedElemLabel = props.renderedProperties[selectedPoint].label
        let value = props.root[selectedPoint]
        return (
            <div>
                <div>
                    You are responing to the {selectedElemLabel} point.
                </div>
            </div>
        )
    }

    const renderFormElems = (values) => {
        return (
            <form>
                <button type='submit'>Submit</button>
            </form>
        )
    }

    return (
        <div>
            <div className='Inherited-Points'>
                <RadioList valuesToRender={props.renderedProperties}
                    setSelectedValue={setSelectedPoint}/>
                
                {selectedPoint ? renderSelectedPoint() : ''}
            </div> 
        </div>
    )
}

export default ResponseForm