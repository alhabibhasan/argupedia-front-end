import React , {useState, useEffect} from 'react'
import { getThread } from '../../data/api/requests/get'
import Argument from '../atoms/Argument'
import { ExpandCollapse } from '../atoms/ExpandCollapse'
import Loading from '../atoms/Loading'
import Options from './Options/Options'

const Thread = props => {
    const rootId = props.rootId
    const [thread, setThread] = useState()

    useEffect(() => {
        getThread(rootId)
        .then(threadData => {
            setThread(threadData.thread)
        })
    }, [props.rootId, props.nodes, rootId])

    const renderAttackers = (attackers, parent) => {
        attackers = attackers.map((argument, index) => {
            let children = false;
            if (argument.attackers.length) {
                children = renderAttackers(argument.attackers, argument.node)
            } 
            const threadChildrenStyles = {
                marginLeft: '5%',
            }
            return (
                <div key={index} style={threadChildrenStyles}>
                    <Argument arg={argument.node} parent={parent}/>
                    <div>
                        <div>
                            <Options 
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
                            </div>
                        : 
                            ''
                        }
                    </div>
                </div>
            )
        })

        return attackers
    }

    const renderThreadInShowHide = () => {
        if (!thread) return <Loading/>
        let renderedAttackers = renderAttackers(thread.attackers, thread.node)
        return (<ExpandCollapse 
                openIcon={'+ Show responses (' + thread.attackers.length + ')'} 
                closeIcon={'- Hide responses (' + thread.attackers.length + ')'} 
                lazyRender={true} 
                render={renderedAttackers}
            />)
    }   

    return (
        <div>
            {renderThreadInShowHide()}
        </div>
    )
}

export default Thread