import React, {useState} from 'react'
import Respond from '../molecules/Respond/Respond'
import './Styles/Options.scss'
import ArgumentForm from './ArgumentForm'
import Button from '../atoms/Button'
import { sendUpdateArgRequest } from '../molecules/Respond/argRequests'
import { deleteArgument } from '../../data/api/Api'

const Options = (props) => {
    const [currentOption, setCurrentOption] = useState('')
    const CALLABLE = 'callable'
    const RENDERABLE = 'renderable'
    const options = [
        {
            name: 'Respond',
            type: RENDERABLE,
            render: () => {
                return <Respond 
                    successMessage={props.successMessage}
                    parent={props.root} 
                    updateArgument={props.updateArgument}/>
            },
            permissions: () => {
                return true
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
                return true
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
                return true
            }
        }
    ]

    const renderOptions = () => {
        return options.map((option, i) => {
            return (
                <Button key={i} 
                    text={option.name} 
                    className='Option' 
                    onClick={() => toggleOption(option)}/>
            )
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
            if (optionToRender && optionToRender.permissions() && optionToRender.render) {
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