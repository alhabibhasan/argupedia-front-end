import React, {useState, useEffect} from 'react'
import ViewArgs from '../organisms/ViewArgsGraph'
import Loading from '../atoms/Loading'
import {getArgumentRoots} from '../../data/api/requests/get'
import {readArgument} from '../../data/routes'
import {redirectTo} from '../../util/redirect';
import Argument from '../atoms/Argument'
import Button from '../atoms/Button'
import ViewRootsRegular from '../organisms/ViewRootsRegular'
import { ScrollDownToLocation } from '../../util/scrollTo'
import Title from '../molecules/Title'

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
        width                 : 'auto',
    }
};

const RootArgs = (props) => {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)

    const header = 'Explore Argument roots'

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
            enableZoomPanInteraction: false,
            nodeLabel: 'statement'
        }
    }

    return (
        <div>
            {loading ? <Loading/> 
                : 
            <div>
                <Title title={'View roots'}/>
                <h1>
                    {header}
                </h1>
                <ScrollDownToLocation 
                    label='View argument list' 
                    location={window.outerHeight}/>
                <ViewArgs 
                    nodes={nodes}
                    links={links}
                    nodeModalContents={modalContents}
                    modalStyle={modalStyle}
                    argGraphProps={getArgGraphProps()}/>
                <ViewRootsRegular
                    nodes={nodes}
                    header={header}
                />
            </div>
            }
        </div>
    )
}

export default RootArgs