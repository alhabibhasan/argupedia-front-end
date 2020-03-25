import React, {useEffect, useState} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ArgumentForm from '../organisms/ArgumentForm'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import './styles/CreateArgs.scss'
import { sendCreateArgRequest } from '../../data/argRequests'
import { userLoggedInAndEmailVerified } from '../../data/auth/user-checks'
import { redirectTo } from '../../util/redirect'
import { auth } from '../../data/routes'
import Title from '../molecules/Title'

const GuidanceText = styled.div`
    text-align: left;
    margin: 3%;
    white-space: pre-wrap;
`

const Page = styled.div`
    margin: 1%;
`

const CreateArg = (props) => {
    const [user, setUser] = useState()

    useEffect(() => {
        if (!userLoggedInAndEmailVerified(props.user)) {
            setUser(props.user)
            redirectTo(props.history, auth.login.use)
        }
    }, [props.user])

    return (
        <Page>
            <Title title={'Create argument'}/>
            <ReactCSSTransitionGroup
            transitionName="Add-Argument"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
                <h1>Let's get started!</h1>
                <GuidanceText>
                    Arguments posted on Argupedia must follow a predefined structure. These pre-set formats have been inspired by leading academics in the 
                    field of Argumentation theory, such as Douglas Walton.

                </GuidanceText>
            
                <GuidanceText>
                    To see the different schemes available to you, switch through the different argument schemes using the dropdown option below.
                </GuidanceText>
            
                <GuidanceText>
                    You should also try to give your argument a quick summary/overview in the statement field. This will allow your readers
                    to get a quick overview of your topic.

                    You will need to specify the reasoning behind your argument. A full explanation of what the available options mean,
                    can be found in the <Link to="/help">help</Link> section of our website.
                </GuidanceText>


                <ArgumentForm 
                    history={props.history} 
                    onSubmit={(values, setArgumentStatus, setArgumentStatusMessage) => {
                        let valuesCopy = JSON.parse(JSON.stringify(values))
                        valuesCopy['root'] = true
                        valuesCopy['uid'] = props.user.uid
                        sendCreateArgRequest(valuesCopy, setArgumentStatus, setArgumentStatusMessage, props.history)
                    }}/>
            </ReactCSSTransitionGroup>
        </Page>
    )
}

export default CreateArg