import React, {useState} from 'react'

const ExpandCollapse = (props) => {
    const [open, setOpen] = useState(false)

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
        <div>
            <div>
                {props.header}
                { open ? renderClose() : renderOpen()}
            </div>

            <div style={{display: open ? 'block' : 'none'}}>
                {props.render}
            </div>
        </div>
    )
}

export {
     ExpandCollapse
}