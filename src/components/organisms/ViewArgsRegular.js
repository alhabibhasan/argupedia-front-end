import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {ExpandCollapse} from '../atoms/ExpandCollapse'
import RespondOption from '../molecules/RespondButton'
import {ScrollToTop} from '../../util/scrollTo'
import Respond from './Respond'
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
        /**
         * TODO: add a link to the parent argument if current isn't a 'base' arg.
         */
        return (
            <ArgumentWrapper>
                <Statement>
                    {root.statement}
                </Statement>
                <div>
                    <Argument arg={root}/>
                </div>
                <RespondOption root={root}/>
                {renderThread()}
            </ArgumentWrapper>
        )
    }

    const renderThread = () => {
        return <Thread rootId={props.rootId} nodes={props.nodes} updateArgument={props.updateArgument}/>
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