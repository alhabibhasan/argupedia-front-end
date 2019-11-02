import React from 'react'

const ViewArgsRegular = (props) => {

    const renderRoot = () => {
        let nodes = props.nodes
        let root = nodes.filter(node => node.root)
        return (
            <h1>
                {root[0].statement}
            </h1>
        )
    }
    return (
        <div>

            {renderRoot()}
        </div>
    )
}

export default ViewArgsRegular