import React from 'react'
import Respond from '../../molecules/Respond/Respond'
import ArgumentForm from '../ArgumentForm'
import { sendUpdateArgRequest } from '../../../data/argRequests'
import { deleteArgument } from '../../../data/api/Api'
import { userLoggedInAndEmailVerified } from '../../../data/auth/user-checks'
import { ResponseSchema } from '../../../data/validators/ArgumentSchema'

const CALLABLE = 'callable'
const RENDERABLE = 'renderable'
const options = [
    {
        name: 'respond',
        display: () => <span>Respond</span>,
        type: RENDERABLE,
        class: 'Option',
        render: (props, metadata) => {
            return <Respond
                user={metadata.user} 
                successMessage={props.successMessage}
                parent={props.root} 
                updateArgument={props.updateArgument}
                metadata={metadata.toggleOption}/>
        },
        permissions: (user) => {
            return userLoggedInAndEmailVerified(user)
        }
    },
    {
        name: 'edit',
        display: () => <span>Edit</span>,
        type: RENDERABLE,
        class: 'Option',
        render: (props, metadata) => {
            let updatedMetadata = {
                id: props.root.id,
                toggleOption: () => metadata.toggleOption('edit'),
                updateArgument: props.updateArgument
            }
            return <ArgumentForm arg={props.root} 
                history={props.history}
                schema={ResponseSchema} 
                onSubmit={(values, setArgumentStatus, setArgumentStatusMessage) => {
                    let valuesCopy = JSON.parse(JSON.stringify(values))
                    valuesCopy['root'] = true
                    valuesCopy['parentId'] = props.root.parentId
                    sendUpdateArgRequest(valuesCopy, setArgumentStatus, setArgumentStatusMessage, updatedMetadata)
                }}/>
        },
        permissions: (user, props) => {
            return user && props.root.creatorUID === user.uid
        }
    },
    {
        name: 'delete',
        type: CALLABLE,
        class: 'Option',
        display: () => <span>Delete</span>,
        call: (props) => {
            let choice = window.confirm('Are you sure you want to delete this argument, this is not reversible?')
            if (choice) {
                deleteArgument(props.root.id)
                .then(() => {
                    props.updateArgument()
                })
            }
        },
        permissions: (user, props) => {
            return user && props.root.creatorUID === user.uid
        }
    },
    {
        name: 'voteStats',
        type: CALLABLE,
        class: 'Vote',
        display: (metadata) => <span>Votes: {metadata.voteInfo.count}</span>,
        permissions: (user) => {
            return true
        }
    }
]

export {
    options,
    RENDERABLE,
    CALLABLE
}