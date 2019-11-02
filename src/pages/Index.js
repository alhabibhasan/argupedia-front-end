import React from 'react'
import { Jumbotron } from 'reactstrap'
import styled from 'styled-components'

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

const Index = () => {
    return (
        <div>
            <Jumbotron>
                <Header>
                    <Welcome>
                        Welcome to argupedia!
                    </Welcome>
                    <Subtext>
                        Argupedia is about promoting productive discussion and debate.
                    </Subtext>
                    <GetStarted>
                        Join in
                    </GetStarted>
                </Header>
            </Jumbotron>
        </div>
    )
}

export default Index