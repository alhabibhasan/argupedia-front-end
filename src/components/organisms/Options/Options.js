import React, {useState, useEffect} from 'react'
import './Options.scss'
import Button from '../../atoms/Button'
import authListener from '../../../data/auth/auth-listener'
import {options, CALLABLE} from './OptionsConfig'

const Options = (props) => {
    const [user, setUser] = useState(false)
    const [currentOption, setCurrentOption] = useState('')
    const [voteInfo, setVoteInfo] = useState({})

    useEffect(() => {
        authListener(setUser)
        setVoteInfo({count: 10})
    }, [props.user, user])

    const renderOptions = () => {
        return options.map((option, i) => {
            if (option.permissions(user, props)) {
                let metadata = {
                    voteInfo
                }
                return (
                    <Button key={i} 
                        text={option.display(metadata)} 
                        className={option.class} 
                        onClick={() => toggleOption(option)}/>
                )
            }
        })
    }

    const toggleOption = (option) => {
        if (option.type === CALLABLE && option.permissions(user, props) && option.call) {
            option.call(props)
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
            if (optionToRender.permissions(user, props) && optionToRender.render) {
                let metadata = {
                    user,
                    toggleOption
                }
                renderedOption = optionToRender.render(props, metadata)
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