import React from 'react'
import { Jumbotron } from 'reactstrap'
import styled from 'styled-components'
import {redirectTo} from '../../util/redirect'
import {createArgument} from '../../data/routes'
import Title from '../molecules/Title'

const Header = styled.div`
    text-align: left;
`

const Welcome = styled.h1`
    font-weight: 300;
`

const Subtext = styled.p`
    font-size: 14pt;
`

const GetStarted = styled.button`
    border: 0;
    background-color: #95e2db8c;
`

const Index = (props) => {
    
    return (
        <div role="main">
            <Title title={'Home'}/>
            <Jumbotron>
                <Header>
                    <Welcome>
                        Welcome to argupedia!
                    </Welcome>
                    <Subtext>
                        Argupedia is about promoting productive discussion and debate.
                    </Subtext>
                    <GetStarted onClick={() => redirectTo(props.history, createArgument.use)}>
                        Join in
                    </GetStarted>
                </Header>
            </Jumbotron>
        </div>
    )
}

export default Index