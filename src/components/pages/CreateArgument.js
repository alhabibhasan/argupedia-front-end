import React, {useState} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CreateArgument from '../organisms/CreateArgument'
import styled from 'styled-components'
import Tooltip from '../atoms/Tooltip'
import './styles/CreateArgs.scss'

const GuidanceText = styled.div`
    text-align: left;
    margin: 5%;
`

const CreateArg = (props) => {
    return (
        <ReactCSSTransitionGroup
        transitionName="Add-Argument"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
            <h1>Let's get started!</h1>
            <GuidanceText>
                Arguments posted on Argupedia are required to follow a set structure. The reason for this is to level the playing field 
                and allow each argument to express their point of view clearly using well defined structures.

                We are aiming to get a structure which closely resembles the following:

            </GuidanceText>
        
            <GuidanceText>
                "In the current circumstance R <br/>
                We should perform action A <br/>
                Which will result in new circumstances S <br/>
                Which will realise goal G <br/>
                Which will promote some value V." 

                <Tooltip 
                    text='Replace R, A, S, G and V with some of your points to see if it has a good flow'
                    style={{color: 'gray'}}
                    type='info'
                />
            </GuidanceText>
        
            <GuidanceText>
                You should also try to give your argument a quick summary/overview in the statement field. This will allow your readers
                to get a quick overview of your topic.
            </GuidanceText>


            <CreateArgument history={props.history}/>
        </ReactCSSTransitionGroup>
    )
}

export default CreateArg