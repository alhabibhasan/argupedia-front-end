import React, {useState, useEffect} from 'react'
import ViewArgs from '../components/molecules/ViewArgs'
import Loading from '../components/atoms/Loading'
import {getArgumentChain} from '../data/api/Api'

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

export default ArgChain