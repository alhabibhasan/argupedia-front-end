import React , {useState, useEffect} from 'react'
import { getThread } from '../../data/api/Api'
import Argument from '../atoms/Argument'
import { ExpandCollapse } from '../atoms/ExpandCollapse'
import Loading from '../atoms/Loading'
import RespondOptions from '../molecules/RespondOptions'

const Thread = props => {
    const rootId = props.rootId
    const [thread, setThread] = useState()

    useEffect(() => {
        getThread(rootId)
        .then(threadData => {
            setThread(threadData.thread)
        })
    }, [props.rootId, props.nodes, rootId])

    const renderAttackers = (attackers) => {
        attackers = attackers.map((argument, index) => {
            let children = false;
            if (argument.attackers.length) {
                children = renderAttackers(argument.attackers)
            } 
            const threadChildrenStyles = {
                marginLeft: '5%'
            }
            return (
                <div key={index} style={threadChildrenStyles}>
                    <Argument arg={argument.node}/>
                    <div>
                        <div>
                            <RespondOptions 
                                updateArgument={props.updateArgument} 
                                root={argument.node}
                            />
                        </div>
                        {children ? 
                            <div>
                                <ExpandCollapse 
                                    openIcon={'+ Show responses (' + children.length + ')'} 
                                    closeIcon={'- Hide responses (' + children.length + ')'} 
                                    lazyRender={true} 
                                    render={children}
                                />
                                {index !== attackers.length - 1 ? <hr/> : ''}
                            </div>
                        
                        : 
                            ''
                        }
                        {!children ? <hr/> : ''}
                    </div>
                </div>
            )
        })

        return attackers
    }

    const renderThreadInShowHide = () => {
        if (!thread) return <Loading/>
        let attackers = thread.attackers
        let renderedAttackers = renderAttackers(attackers)
        return (<ExpandCollapse 
                openIcon={'+ Show responses (' + thread.attackers.length + ')'} 
                closeIcon={'- Hide responses (' + thread.attackers.length + ')'} 
                lazyRender={true} 
                render={renderedAttackers}
            />)
    }   

    return (
        <div>
            <hr/>
            {renderThreadInShowHide()}
        </div>
    )
}

export default Thread