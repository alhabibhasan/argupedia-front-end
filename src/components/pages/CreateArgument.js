import React, {useState} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CreateArgument from '../organisms/CreateArgument'
import './styles/CreateArgs.scss'

const CreateArg = (props) => {
    return (
        <ReactCSSTransitionGroup
        transitionName="addArg"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
            <CreateArgument history={props.history}/>
        </ReactCSSTransitionGroup>
    )
}

export default CreateArg