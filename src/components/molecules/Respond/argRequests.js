import { waitThenRedirectTo } from "../../../util/redirect"
import { readArgument } from '../../../data/routes'
import { createArgument, createResponse } from "../../../data/api/Api"


const sendCreateArgRequest = (values, setArgumentStatus, setArgumentStatusMessage, history) => {
    createArgument(values)
    .then(response => {
        let createdNode = response.createdNode
        setArgumentStatus('SUCCESS')
        setArgumentStatusMessage('Your argument was created successfully, redirecting you now.')
        waitThenRedirectTo(history, readArgument.use + createdNode.id, 1500)
    })
    .catch(() => {
        setArgumentStatus('ERROR')
        setTimeout(() => {
            setArgumentStatus('NOT_ATTEMPTED')
        }, 1500)
        setArgumentStatusMessage('An argument with this statement already exists, please either add to it or reword your one.')
    })
}

const sendCreateResponseRequest = (values, setArgumentStatus, setArgumentStatusMessage, metadata) => {
    createResponse(metadata.parentId, values)
    .then(() => {
        setArgumentStatus('SUCCESS')
        setArgumentStatusMessage(metadata.successMessage ? metadata.successMessage : metadata.defaultSuccessMessage)
        setTimeout(() => {
            setArgumentStatus('NOT_ATTEMPTED')
            window.scrollTo({ top: 0, behavior: 'smooth'})
            setTimeout(() => metadata.updateArgument(), 1000)
        }, 1000)
    })
    .catch(() => {
        setArgumentStatus('ERROR')
        setTimeout(() => setArgumentStatus('NOT_ATTEMPTED'), 1500)
        setArgumentStatusMessage('Oops, there was an error, please try again. If it persists, contact the admin via admin@argupedia.com.')
    })
}



export {
    sendCreateArgRequest,
    sendCreateResponseRequest
}