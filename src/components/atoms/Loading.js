import React from 'react'

const Loading = (props) => {
    return (
        <div>
            <div>
                Loading...
            </div>

            {props.message ? <div>{props.message}</div> : ''}
        </div>
    )
}

export default Loading