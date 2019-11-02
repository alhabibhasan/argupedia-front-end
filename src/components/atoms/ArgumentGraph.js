import React, {useState, useEffect} from 'react'
import { ForceGraph2D } from 'react-force-graph';
import { getArgumentChain } from '../../data/api/Api'


/* Component */
const ArgumentGraph = (props) => {
    const renderGraph = () => {
        return (
            <div>
                <ForceGraph2D
                graphData={{
                    nodes: props.nodes,
                    links: props.links
                }}
                nodeLabel="statement"
                linkLabel="type"
                nodeCanvasObject={(node, ctx) => {
                    ctx.beginPath(); 
                    if (node.root) {
                        ctx.fillStyle = 'green'
                        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false); 
                    } else {
                        ctx.fillStyle = 'red'
                        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
                    }
                    ctx.fill(); 
                }}
                onNodeClick={(node, event) => {
                    node.fy = node.y
                    node.fx = node.x
                    props.onNodeClick(node, event)
                }}
                enableZoomPanInteraction={false}
                />
            </div>
                
        )
    }

    return (
        <div>
            {renderGraph()}
        </div>
    )
  }


export default ArgumentGraph