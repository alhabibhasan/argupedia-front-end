import React, {useState, useEffect} from 'react'
import ViewArgsGraph from '../organisms/ViewArgsGraph'
import ViewArgsRegular from '../organisms/ViewArgsRegular'
import Loading from '../atoms/Loading'
import {getArgumentChain} from '../../data/api/requests/get'
import styled from 'styled-components'
import { ScrollDownToLocation } from '../../util/scrollTo'
import Argument from '../atoms/Argument'
import Button from '../atoms/Button'
import {readArgument} from '../../data/routes'
import {redirectTo} from '../../util/redirect';
import Options from '../organisms/Options/Options'
import graphConfig from '../../data/graphConfig'

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

const ViewArgument = (props) => {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [root, setRoot] = useState()
    const [loading, setLoading] = useState(true)
    
    const rootId = props.match.params.id

    useEffect(() => {
        updateArgument()
    }, [rootId])

    const modalContents = (node) => {
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
                        <Options 
                            successMessage='Your argument has been added, close this modal to see it.' 
                            updateArgument={updateArgument} 
                            root={node}/>
                </div>
            </ModelContent>
        )
    }

    const updateArgument = () => {
        getArgumentChain(rootId)
        .then(data => {
            let chain = data.argChain
            if (chain && chain.nodes && chain.links) {
                setNodes(chain.nodes)
                setLinks(chain.links)
                let root = chain.nodes.filter(node => node.id === rootId)[0]
                setRoot(root)
                setLoading(false)
            }
        })
    }

    const getArgGraphProps = () => {
        return {
            nodeCanvasObject: (node, ctx) => {
                let fillStyle = graphConfig[node.configCode].fillStyle
                let radius = graphConfig[node.configCode].radius
                ctx.beginPath(); 
                ctx.fillStyle = fillStyle
                ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                ctx.fill();
            },
            enableZoomPanInteraction: false,
            nodeLabel: 'statement',
            linkLabel: 'type'
        }
    }

    const renderGoToParent = () => {
        let linkedParent = root.parentId
        if (linkedParent > 0) {
            return (
                <Button 
                        text={'Go to parent argument'} 
                        onClick={() => {
                            redirectTo(props.history, readArgument.use + linkedParent)
                        }}
                        style={{
                            fontSize: '12pt',
                            backgroundColor: '#a8a9a9',
                        }}
                    />
            )
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
                    {renderGoToParent()}
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

export default ViewArgument