import React, {useState, useEffect} from 'react'
import Button from './Button'
import './styles/SourceList.scss'

const SourceList = (props) => {
    const [list, setList] = useState([])
    const [currInput, setCurrInput] = useState('')

    const renderExistingList = () => {
        if (!list || list.length === 0) return <ul/>
        let listToRender = list.map((item, index) => 
            <div key={item+index} className='List-Elem'>
                <div>{item}</div>
                <Button
                    icon="back" 
                    className="Remove-Btn"
                    onClick={() => removeListElem(index)}
                />
            </div>
        )
        return (
            <div>
                {listToRender}
            </div>
        )
    }

    useEffect(() => {
        props.updateList(JSON.stringify(list))
    }, [list])

    const removeListElem = (indexToRemove) => {
        let newList = list.filter((elem, index) => index !== indexToRemove)
        setList(newList)
    }

    const addToList = (toAdd) => {
        if (!toAdd || !toAdd.length) return;
        setList(list.concat(toAdd))
        setCurrInput('')
    }

    return (
        <div >
            {renderExistingList()}
            <label htmlFor="addToList">{props.label}</label>
            <br/>
            <input 
                type="text" 
                name="addToList" 
                value={currInput} 
                onChange={(e) => setCurrInput(e.target.value)} />

            <Button 
                icon="add"
                onClick={() => addToList(currInput)}
            />
        </div>
    )
}

export default SourceList