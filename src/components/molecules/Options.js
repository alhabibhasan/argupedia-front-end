import React from 'react'
import Button from '../atoms/Button'
import { ExpandCollapse } from '../atoms/ExpandCollapse'
import Respond from '../organisms/Respond'
import './Styles/RespondButton.scss'
import ArgumentForm from '../organisms/ArgumentForm'

const RespondButton = () => <Button text='Respond' className='Respond'/>
const EditButton = () => <Button text='Edit' className='Edit'/>

const style = {
    'textAlign': 'center',
}

const Options = (props) => {

    const renderResponseOption = () => {
        return (
            <div>
                <ExpandCollapse
                className='Respond'
                openIcon={<RespondButton/>}
                closeIcon={<RespondButton/>}
                style={style}
                render={<Respond 
                        successMessage={props.successMessage}
                        parent={props.root} 
                        updateArgument={props.updateArgument}/>}
                />
            </div>
        )
    }

    const renderEditOption = () => {
        return (
            <ExpandCollapse
            className='Edit'
            openIcon={<EditButton/>}
            closeIcon={<EditButton/>}
            style={style}
            render={<ArgumentForm arg={props.root}/>}
        />
        )
    }

    return (
        <div>
            {renderResponseOption()}
            {renderEditOption()}
        </div>
    )
}

export default Options