import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Options from './Options/Options'
import {ScrollToTop} from '../../util/scrollTo'
import Argument from '../atoms/Argument'
import Thread from  '../organisms/Thread'


const ArgumentWrapper = styled.div`
    margin: 5%;
    padding: 1%;
`
const Statement = styled.h1`
    margin-bottom: 4%;
`

const ViewArgsRegular = (props) => {
    const [root, setRoot] = useState()

    useEffect(() => {
        let nodes = props.nodes
        setRoot(nodes.filter(node => node.id === props.rootId)[0])
    }, [props.rootId, props.nodes])

    const renderRoot = () => {
        if (!root) return;
        return (
            <ArgumentWrapper>
                <Statement>
                    {root.statement}
                </Statement>
                <div>
                    <Argument arg={root}/>
                </div>
                <Options updateArgument={props.updateArgument} root={root}/>

                <Thread 
                    rootId={props.rootId} 
                    nodes={props.nodes} 
                    updateArgument={props.updateArgument}
                    rootDeleted={root.deleted}
                />
            </ArgumentWrapper>
        )
    }

    return (
        <div>
            <ScrollToTop label='View graph'/>
            {renderRoot()}
            <ScrollToTop label='Go to the top' style={{marginBottom: '5%'}}/>
        </div>
    )
}

export default ViewArgsRegular