import React from 'react'
import Button from '../atoms/Button'
import { ExpandCollapse } from '../atoms/ExpandCollapse'
import Respond from '../organisms/Respond'
import './styles/RespondButton.scss'

const RespondButton = () => {
    return (<Button text='Respond' className='Respond'/>)
}

const style = {
    'text-align': 'center',
}

const RespondOption = (props) => {
    return (
        <ExpandCollapse
            className='Respond'
            openIcon={<RespondButton/>}
            closeIcon={<RespondButton/>}
            style={style}
            render={<Respond 
                successMessage={props.successMessage}
                hideBack={props.hideBack}
                parent={props.root} 
                updateArgument={props.updateArgument}
            />}
        />
    )
}

export default RespondOption