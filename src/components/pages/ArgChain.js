import React, {useState, useEffect} from 'react'
import ViewArgsGraph from '../organisms/ViewArgsGraph'
import ViewArgsRegular from '../organisms/ViewArgsRegular'
import Loading from '../atoms/Loading'
import {getArgumentChain} from '../../data/api/Api'

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
                this is from arg chainz
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

    return (
        <div>
            {loading ? <Loading/> 
                : 
            <div>
                <ViewArgsGraph 
                    nodes={nodes}
                    links={links}
                    nodeModalContents={modalContents}
                    argGraphProps={getArgGraphProps()}
                    modalStyle={modalStyle}/>
                <ViewArgsRegular
                    nodes={nodes}
                    links={links}/>
            </div>
            }
        </div>
    )
}

export default ArgChain