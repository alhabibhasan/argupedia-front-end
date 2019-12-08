import React, {useState, useEffect} from 'react'
import { DropdownList } from '../atoms/DropdownList'
import motivationSchemas from '../../data/motivationSchemas'

/**
 * Last left off at:
 * 
 * Being able to respond to an argument.
 * Want to us a form - not formik - type approach (like golden shoe return section)
 * 
 * Then need backend to create a thread style arg response and want to be able to render this.
 * 
 */

const ResponseForm = (props) => {
    const [selectedPoint, setSelectedPoint] = useState()

    useEffect(() => {
        // setSexlectedPoint(props.root.argumentBasis)
    }, [props.root])

    const renderSelectedPoint = () => {
        if (selectedPoint) {
            let selectedElemLabel = props.renderedProperties[selectedPoint].label
            return (
                <div>
                    <div>
                        You are responing to the {selectedElemLabel} point.
                    </div>
                </div>
            )
        }

        return ( <div>
            Select a point to attack from the list above.
        </div>)
    }

    const renderSchemaSelection = () => {
        // get critical questions
        let selectableSchemas = Object.keys(motivationSchemas).map((schema, index) => {
            return (
                <option value={schema} key={index}>{motivationSchemas[schema].label}</option>
            )
        })
        if (selectedPoint) {
            return (
                <div>
                    <div>
                        We recommend using some of the critical questions below to attack this point, but if you feel otherwise, feel free to change.
                    </div>  
                    <select>
                        {selectableSchemas}
                    </select>
                </div>
            )
        }
    }

    return (
        <div>
            <div className='Inherited-Points'>
                <DropdownList valuesToRender={props.renderedProperties}
                    setSelectedValue={setSelectedPoint}/>
                {renderSelectedPoint()}
                {renderSchemaSelection()}
            </div> 
        </div>
    )
}

export default ResponseForm