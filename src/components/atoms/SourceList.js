import React, {useState} from 'react'
import BackButton from './BackButton'

const SourceList = (props) => {
    const [list, setList] = useState([])
    const [currInput, setCurrInput] = useState('')

    const renderExistingList = () => {
        if (!list || list.length === 0) return <ul/>
        let listToRender = list.map((item, index) => 
            <div key={item+index}>
                <li>{item}</li>
                <BackButton onClick={() => removeListElem(index)}></BackButton>
            </div>
        )
        return (
            <ul>
                {listToRender}
            </ul>
        )
    }

    const removeListElem = (indexToRemove) => {
        let newList = list.filter((elem, index) => index != indexToRemove)
        setList(newList)
    }

    const addToList = (toAdd) => {
        setList(list.concat(toAdd))
        setCurrInput('')
    }

    return (
        <div>
            {renderExistingList()}
            <input type="text" value={currInput} onChange={(e) => setCurrInput(e.target.value)} />
            <button onClick={() => addToList(currInput)}>Add to list</button>
        </div>
    )
}

export default SourceList