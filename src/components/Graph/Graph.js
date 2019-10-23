import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { ForceGraph2D } from 'react-force-graph';


/* Component */
const Graph = (props) => {

    const [nodes, setNodes] = useState({})
    const [links, setLinks] = useState({})

    useEffect(() => {
        axios.get("https://gist.githubusercontent.com/mbostock/74cb803c013404ac30e63f020a52a2fd/raw/c7c74c939b602c56c80848963f9ad24802baaead/graph.json")
            .then(res => {
                let data = res.data;
                setLinks(data.links);
                setNodes(data.nodes);
            })
    }, [])


    return (
        <div>
            <ForceGraph2D
                graphData={
                    {
                        "nodes": [ 
                            { 
                              "id": "id1",
                              "name": "name1",
                              "val": 1 
                            },
                            { 
                              "id": "id2",
                              "name": "name2",
                              "val": 1
                            }
                        ],
                        "links": [
                            {
                                "source": "id1",
                                "target": "id2"
                            }
                        ]
                    }
                }
                nodeLabel="name"
            />,
        </div>
    )
  }


export default Graph