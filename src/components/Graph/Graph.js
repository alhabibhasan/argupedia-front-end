import React, {useState, useEffect} from 'react'
import { ForceGraph2D } from 'react-force-graph';
import { getArgumentChain } from '../../data/api/Api'

import Loading from '../Loading/Loading'

/* Component */
const Graph = (props) => {

    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getArgumentChain()
        .then(chain => {
            setNodes(chain.argChain.nodes)
            setLinks(chain.argChain.links)
            setLoading(false)
        })
    }, [])

    const renderGraph = () => {
        return (
            <div>
                <ForceGraph2D 
                graphData={{nodes,links}}
                nodeLabel="statement"
                linkLabel="type"
                />
                <div>
                    This is a side tag.
                </div>
            </div>
                
        )
    }

    return (
        <div>
            {loading ? <Loading/> : renderGraph()}
        </div>
    )
  }


export default Graph