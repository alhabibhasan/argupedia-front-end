import React, {useState} from 'react'
import Loading from '../atoms/Loading'
import ArgumentGraph from '../molecules/ArgumentGraph'
import Modal from 'react-modal'
import Button from '../atoms/Button'

Modal.setAppElement('#root')

const ViewArgsGraph = (props) => {
    const [showModal, setModal] = useState(false)
    const [selectedNode, setSelectedNode] = useState()

    const toggleModal = () => {
        setModal(!showModal)
    }

    const handleNodeClick = (node, event) => {
        setSelectedNode(node)
        toggleModal()
    }

    const renderRoots = () => {
        return (
            <div>
                <ArgumentGraph 
                    nodes={props.nodes} 
                    links={props.links} 
                    onNodeClick={(node, event) => handleNodeClick(node, event)}
                    argGraphProps={props.argGraphProps}
                />
            </div>
        )
    }

    return (
        <div>
            {renderRoots()}
            <Modal isOpen={showModal} style={props.modalStyle}>
                {selectedNode ? props.nodeModalContents(selectedNode) : <Loading/>}
                <Button 
                    text='Close' 
                    style={{
                        fontSize: '12pt',
                    }} 
                    onClick={toggleModal}/>
            </Modal>
        </div>
    )
}

export default ViewArgsGraph