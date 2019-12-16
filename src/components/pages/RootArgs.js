import React, {useState, useEffect} from 'react'
import ViewArgs from '../organisms/ViewArgsGraph'
import Loading from '../atoms/Loading'
import {getArgumentRoots} from '../../data/api/Api'
import {readArgument} from '../../data/routes'
import {redirectTo} from '../../util/redirect';
import Argument from '../atoms/Argument'
import Button from '../atoms/Button'

const modalStyle = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        maxHeight             : '90vh',
        height                : 'auto',
        width                 : '50vh',
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
                            background: '#a9a8a8',
                            fontSize: '12pt'
                        }}/>
                </div>
            </div>
        )
    }

    const getArgGraphProps = () => {
        return {
            nodeCanvasObject: (node, ctx) => {
                ctx.beginPath(); 
                ctx.fillStyle = '#ff9999'
                ctx.arc(node.x, node.y, 20, 0, 20 * Math.PI, false);
                ctx.fill();
            },
            enableZoomPanInteraction: true,
            nodeLabel: 'statement'
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