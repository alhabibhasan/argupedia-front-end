import React, {useState, useEffect} from 'react'
import ViewArgs from '../components/molecules/ViewArgs'
import Loading from '../components/atoms/Loading'
import {getArgumentRoots} from '../data/api/Api'
import redirectTo from '../util/redirect';

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
                <br/>
                this is from rootargs
                <br/>
                <button onClick={() => redirectTo(props.history, '/graphs/argument/' + node.id)}>Go to arg</button>
            </div>
        )
    }

    return (
        <div>
            {loading ? <Loading/> 
                : 
            <ViewArgs 
                nodes={nodes}
                links={links}
                nodeModalContents={modalContents}/>
            }
        </div>
    )
}

export default RootArgs