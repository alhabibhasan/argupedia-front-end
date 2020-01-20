import React, {useState, useEffect} from 'react'
import Respond from '../molecules/Respond/Respond'
import './Styles/Options.scss'
import ArgumentForm from './ArgumentForm'
import Button from '../atoms/Button'

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
                return <ArgumentForm arg={props.root} />
            },
            permissions: () => {
                return true
            }
        },
        {
            name: 'Upvote',
            type: CALLABLE,
            call: () => {
                alert('hello there mimesis!')
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

    return (
        <div>    
            <div className='Options-Block'>
                {renderOptions()}
            </div>
            <div className='Options-Rendered'>
                {renderCurrentOption()}
            </div>
        </div>
    )
}

export default Options