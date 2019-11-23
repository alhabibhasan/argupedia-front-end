import React, {useState} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CreateArgument from '../organisms/CreateArgument'
import BackButton from '../atoms/BackButton'
import './styles/CreateArgs.scss'

const CreateArg = (props) => {
    const [formTouched, setFormTouched] = useState(false)

    const confirmLeave = () => {
        if (formTouched) {
            if (window.confirm('If you leave, you will loose any content you have added below. Are you sure you want to leave?')) {
                props.history.goBack()
            } 
        } else {
            props.history.goBack()
        }
    }

    return (
        <ReactCSSTransitionGroup
        transitionName="addArg"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
            <CreateArgument setFormTouched={setFormTouched}/>
            <BackButton onClick={confirmLeave}/>
        </ReactCSSTransitionGroup>
    )
}

export default CreateArg