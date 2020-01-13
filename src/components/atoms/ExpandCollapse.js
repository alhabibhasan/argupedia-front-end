import React, {useState} from 'react'

const ExpandCollapse = (props) => {
    const [open, setOpen] = useState(props.open)

    const renderClose = () => {
        return (
            <span onClick={() => setOpen(false)}>{props.closeIcon}</span>
        )
    }

    const renderOpen = () => {
        return (
            <span onClick={() => setOpen(true)}>{props.openIcon}</span>
        )
    }

    return (
        <div style={props.style}>
            <div>
                {props.header}
                { open ? renderClose() : renderOpen()}
            </div>

            {props.lazyRender ? 
            
            <div>
                {open ? <div> {props.render} </div> : ''}
            </div>
            
            :
            
            <div style={{display: open ? 'block' : 'none'}}>
                {props.render}
            </div>
            
            }
        </div>
    )
}

export {
     ExpandCollapse
}