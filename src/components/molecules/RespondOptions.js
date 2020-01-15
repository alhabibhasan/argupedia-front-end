import React from 'react'
import Button from '../atoms/Button'
import { ExpandCollapse } from '../atoms/ExpandCollapse'
import Respond from '../organisms/Respond'
import './Styles/RespondButton.scss'

const RespondButton = () => {
    return (<Button text='Respond' className='Respond'/>)
}

const style = {
    'textAlign': 'center',
}

const RespondOptions = (props) => {
    return (
        <ExpandCollapse
            className='Respond'
            openIcon={<RespondButton/>}
            closeIcon={<RespondButton/>}
            style={style}
            render={<Respond 
                successMessage={props.successMessage}
                parent={props.root} 
                updateArgument={props.updateArgument}
            />}
        />
    )
}

export default RespondOptions