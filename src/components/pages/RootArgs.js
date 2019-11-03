import React, {useState, useEffect} from 'react'
import ViewArgs from '../organisms/ViewArgsGraph'
import Loading from '../atoms/Loading'
import {getArgumentRoots} from '../../data/api/Api'
import redirectTo from '../../util/redirect';

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

const RootArgs = (props) => {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getArgumentRoots()
        .then(rootData => {
            if (rootData && rootData.nodes && rootData.links) {
                setNodes(rootData.nodes)
                setLinks(rootData.links)
                setLoading(false)
            }
        })
    }, [])

    const modalContents = (node) => {
        return (
            <div>
                {node.statement}
                <button onClick={() => redirectTo(props.history, '/graphs/argument/' + node.id)}>Go to arg</button>
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
            <ViewArgs 
                nodes={nodes}
                links={links}
                nodeModalContents={modalContents}
                modalStyle={modalStyle}
                argGraphProps={getArgGraphProps()}/>
            }
        </div>
    )
}

export default RootArgs