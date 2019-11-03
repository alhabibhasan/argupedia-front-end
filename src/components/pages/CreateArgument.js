import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CreateArgument from '../organisms/CreateArgument'
import BackButton from '../atoms/BackButton'
import './styles/CreateArgs.scss'

const CreateArg = (props) => {

    return (
        <ReactCSSTransitionGroup
        transitionName="addArg"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
            <CreateArgument/>
            <BackButton onClick={() => props.history.goBack()}/>
        </ReactCSSTransitionGroup>
    )
}

export default CreateArg