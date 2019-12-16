import React, {useState, useEffect} from 'react'
import ViewArgsGraph from '../organisms/ViewArgsGraph'
import ViewArgsRegular from '../organisms/ViewArgsRegular'
import Loading from '../atoms/Loading'
import {getArgumentChain} from '../../data/api/Api'
import styled from 'styled-components'
import { ScrollDownToLocation } from '../../util/scrollTo'
import Argument from '../atoms/Argument'
import Respond from '../organisms/Respond'
import {ExpandCollapse} from '../atoms/ExpandCollapse'
import Button from '../atoms/Button'
import {readArgument} from '../../data/routes'
import {redirectTo} from '../../util/redirect';

const RootStatement = styled.h1`
    padding-top: 1%;
`

const ModelContent = styled.div`
    padding-bottom: 2%;
`

const modalStyle = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        overflowY             : 'scroll',
        maxHeight             : '90vh',
        height                : 'auto',
        width                 : '50%',
        maxWidth              : '80%',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        textAlign             : 'center',
        display               : 'inline-block'
    }
};

const ArgChain = (props) => {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)
    
    const rootId = props.match.params.id

    useEffect(() => {
        updateArgument()
    }, [rootId])

    const modalContents = (node) => {
        let respondButton = (
            <Button text='Respond' 
                style={{
                    backgroundColor: '#a9a8a8',
                    fontSize: '12pt',
                    marginTop: '1%'
                }}
            />
        )   
        return (
            <ModelContent>
                <div>
                    <Argument arg={node}/>
                </div>
                <div>
                    <Button 
                        text={'Go to argument'} 
                        onClick={() => {
                            redirectTo(props.history, readArgument.use + node.id)
                        }}
                        style={{
                            fontSize: '12pt',
                            backgroundColor: '#a8a9a9',
                        }}
                    />
                </div>
                <div>
                    <ExpandCollapse 
                            openIcon={respondButton}
                            closeIcon={respondButton}
                            render={<Respond
                                successMessage='Your argument has been added, close this modal to see it.' 
                                hideBack={true}
                                root={node} 
                                updateArgument={updateArgument}/>}
                        />
                </div>
            </ModelContent>
        )
    }

    const updateArgument = () => {
        getArgumentChain(rootId)
        .then(chain => {
            if (chain && chain.nodes && chain.links) {
                setNodes(chain.nodes)
                setLinks(chain.links)
                setLoading(false)
            }
        })
    }

    const getArgGraphProps = () => {
        return {
            nodeCanvasObject: (node, ctx) => {
                ctx.beginPath(); 
                ctx.fillStyle = '#ff9999'
                ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI, false);
                ctx.fill();
            },
            enableZoomPanInteraction: true,
            nodeLabel: 'statement',
            linkLabel: 'type'
        }
    }

    const renderRootStatement = () => {
        let root = nodes.filter(node => node.id === rootId)[0]
        if (root) {
            return (
                <div>
                    <RootStatement>
                        {root.statement}
                    </RootStatement>
                </div>
            )
        }

    }

    return (
        <div>
            {loading ? <Loading/> 
                : 
                <div>
                    {renderRootStatement()}
                    <ScrollDownToLocation label='View thread' location={window.outerHeight}/>
                    <ViewArgsGraph 
                        updateArgument={updateArgument}
                        nodes={nodes}
                        links={links}
                        nodeModalContents={modalContents}
                        argGraphProps={getArgGraphProps()}
                        modalStyle={modalStyle}/>  
                    <ViewArgsRegular
                        updateArgument={updateArgument}
                        rootId={rootId}
                        nodes={nodes}
                        links={links}/>
                </div>
            }
        </div>
    )
}

export default ArgChain