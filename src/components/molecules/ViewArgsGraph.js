import React, {useState, useEffect} from 'react'
import Loading from '../atoms/Loading'
import ArgumentGraph from '../atoms/ArgumentGraph'
import Modal from 'react-modal'


const modalStyle = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  
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
                />
            </div>
        )
    }

    return (
        <div>
            {renderRoots()}
            <Modal isOpen={showModal} style={modalStyle}>
                {selectedNode ? props.nodeModalContents(selectedNode) : <Loading/>}
                <button onClick={toggleModal}>Close</button>
            </Modal>
        </div>
    )
}

export default ViewArgsGraph