import React, {useState, useEffect} from 'react'
import Respond from '../molecules/Respond/Respond'
import './Styles/Options.scss'
import ArgumentForm from './ArgumentForm'
import Button from '../atoms/Button'
import { sendUpdateArgRequest } from '../../data/argRequests'
import { deleteArgument } from '../../data/api/Api'
import { userLoggedInAndEmailVerified } from '../../data/auth/user-checks'
import authListener from '../../data/auth/auth-listener'
import { ResponseSchema } from '../../data/validators/ArgumentSchema'

const Options = (props) => {
    const [user, setUser] = useState(false)
    const [currentOption, setCurrentOption] = useState('')

    useEffect(() => {
        authListener(setUser)
    }, [props.user, user])

    const CALLABLE = 'callable'
    const RENDERABLE = 'renderable'
    const options = [
        {
            name: 'Respond',
            type: RENDERABLE,
            render: () => {
                return <Respond
                    user={user} 
                    successMessage={props.successMessage}
                    parent={props.root} 
                    updateArgument={props.updateArgument}
                    metadata={toggleOption}/>
            },
            permissions: () => {
                return userLoggedInAndEmailVerified(user)
            }
        },
        {
            name: 'Edit',
            type: RENDERABLE,
            render: () => {
                let metadata = {
                    id: props.root.id,
                    toggleOption: () => toggleOption('Edit'),
                    updateArgument: props.updateArgument
                }
                return <ArgumentForm arg={props.root} 
                    history={props.history} 
                    onSubmit={(values, setArgumentStatus, setArgumentStatusMessage) => {
                        let valuesCopy = JSON.parse(JSON.stringify(values))
                        valuesCopy['root'] = true
                        sendUpdateArgRequest(valuesCopy, setArgumentStatus, setArgumentStatusMessage, metadata)
                    }}/>
            },
            permissions: () => {
                return props.root.creatorUID === user.uid
            }
        },
        {
            name: 'Delete',
            type: CALLABLE,
            call: () => {
                let choice = window.confirm('Are you sure you want to delete this argument, this is not reversible?')
                if (choice) {
                    deleteArgument(props.root.id)
                    .then(() => {
                        props.updateArgument()
                    })
                }
            },
            permissions: () => {
                return props.root.creatorUID === user.uid
            }
        }
    ]

    const renderOptions = () => {
        if (!userLoggedInAndEmailVerified(user)) {
            return <div>
                Please login to be able to respond to arguments.
            </div>
        }
        return options.map((option, i) => {
            if (option.permissions()) {
                return (
                    <Button key={i} 
                        text={option.name} 
                        className='Option' 
                        onClick={() => toggleOption(option)}/>
                )
            }
        })
    }

    const toggleOption = (option) => {
        if (option.type === CALLABLE && option.permissions()) {
            option.call()
        } else {
            if (currentOption === option.name) {
                setCurrentOption('')
            } else {
                setCurrentOption(option.name)
            }
        }
    }

    const renderCurrentOption = () => {
        let renderedOption;
        if (currentOption && currentOption.length > 0) {
            let optionToRender = options.filter(opt => opt.name === currentOption)[0]
            if (optionToRender.permissions() && optionToRender.render) {
                renderedOption = optionToRender.render()
            }
        }
        return renderedOption
    }

    const showDeletedMessage = () => {
        if (props.root.deleted) return 'This post has been deleted so further responses are blocked.'
    }

    return (
        <div>
            {props.root.deleted ? 
            <div>
                {showDeletedMessage()}
            </div> 
            : 
            <div>    
                <div className='Options-Block'>
                    {renderOptions()}
                </div>
                <div className='Options-Rendered'>
                    {renderCurrentOption()}
                </div>
            </div> 
        }
        </div>
        
    )
}

export default Options