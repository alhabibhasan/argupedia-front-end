import React from 'react'
import { ForceGraph2D } from 'react-force-graph';


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
                    nodeLabel={props.argGraphProps.nodeLabel}
                    linkLabel={props.argGraphProps.linkLabel}
                    nodeCanvasObject={props.argGraphProps.nodeCanvasObject}
                    onNodeClick={(node, event) => {
                        node.fy = node.y
                        node.fx = node.x
                        props.onNodeClick(node, event)

                        if (props.argGraphProps.onNodeClick) {
                            props.argGraphProps.onNodeClick()
                        }
                    }}
                    enableZoomPanInteraction={props.argGraphProps.enableZoomPanInteraction}
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