import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {ExpandCollapse} from '../atoms/ExpandCollapse'
import Button from '../atoms/Button'
import {ScrollToTop} from '../../util/scrollTo'
import Respond from './Respond'
import Argument from '../atoms/Argument'


const ArgumentWrapper = styled.div`
    margin: 5%;
    padding: 1%;
`
const Statement = styled.h1`
    margin-bottom: 4%;
`

const Label = styled.div`
    font-style: italic;
    font-size: 12pt;
    color: gray;
`

const Point = styled.div`
    font-size: 18pt;
    margin-bottom: 2%;
    white-space: pre-wrap;
    text-align: left;
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
         * TODO: add a link to the parent argument if current isn't a root.
         */
        return (
            <ArgumentWrapper>
                <Statement>
                    {root.statement}
                </Statement>
                <div>
                    <Argument arg={root}/>
                </div>
                {renderResponseOptions()}
            </ArgumentWrapper>
        )
    }

    const renderResponseOptions = () => {
        let respondButton = (
            <div>
                <Button text='Respond' 
                    style={{
                        backgroundColor: '#a9a8a8',
                        fontSize: '18pt',
                        marginTop: '1%'
                    }}
                />
            </div>
        )
        
        return (
            <ExpandCollapse 
            openIcon={respondButton}
            closeIcon={respondButton}
            render={<Respond root={root}/>}
            />
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