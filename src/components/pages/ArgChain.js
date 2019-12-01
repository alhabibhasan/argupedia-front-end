import React, {useState, useEffect, useRef} from 'react'
import ViewArgsGraph from '../organisms/ViewArgsGraph'
import ViewArgsRegular from '../organisms/ViewArgsRegular'
import Loading from '../atoms/Loading'
import {getArgumentChain} from '../../data/api/Api'
import styled from 'styled-components'

const RootStatement = styled.h1`
    padding-top: 1%;
`

const modalStyle = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const ArgChain = (props) => {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [rootId, setRootId] = useState(props.match.params.id)
    const [loading, setLoading] = useState(true)
    const threadRef = useRef(null)

    useEffect(() => {
        getArgumentChain(rootId)
        .then(chain => {
            if (chain && chain.nodes && chain.links) {
                setNodes(chain.nodes)
                setLinks(chain.links)
                setLoading(false)
            }
        })
    }, [rootId])

    const modalContents = (node) => {
        return (
            <div>
                {node.statement}
                <br/>
            </div>
        )
    }

    const getArgGraphProps = () => {
        return {
            nodeCanvasObject: (node, ctx) => {
                ctx.beginPath(); 
                ctx.fillStyle = '#ff9999'
                ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI, false);
                ctx.fill();
            },
            enableZoomPanInteraction: false
        }
    }

    const renderRootStatement = () => {
        let root = nodes.filter(node => node.root)[0]
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

    const renderViewThread = () => {
        return (
            <div onClick={() => {
                let distanceFromTop = threadRef.current.offsetTop
                window.scrollTo({
                    top: distanceFromTop,
                    behavior: 'smooth'
                })
            }}>
                <div>
                    View Thread
                </div>
                <div style={{transform: 'rotate(180deg)'}}>
                    &#8963;    
                </div>
            </div>
        )
    }

    return (
        <div>
            {loading ? <Loading/> 
                : 
            <div>
                {renderRootStatement()}
                {renderViewThread()}
                <ViewArgsGraph 
                    nodes={nodes}
                    links={links}
                    nodeModalContents={modalContents}
                    argGraphProps={getArgGraphProps()}
                    modalStyle={modalStyle}/>
                <div ref={threadRef}>
                    <ViewArgsRegular
                        id='Thread-View'
                        nodes={nodes}
                        links={links}/>
                </div>
            </div>
            }
        </div>
    )
}

export default ArgChain