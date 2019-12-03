import React from 'react'

const ScrollToTop = ({label, style}) => {
    return (
        <div style={style} onClick={() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }}>
            <div>
                &#8963;
            </div>
            <div>
                {label}
            </div>
        </div>
    )
}

const ScrollDownToLocation = ({label, location}) => {
    return (
        <div onClick={() => {
            window.scrollTo({
                top: location,
                behavior: 'smooth'
            })
        }}>
            <div>
                {label}
            </div>
            <div style={{transform: 'rotate(180deg)'}}>
                &#8963;    
            </div>
        </div>
    )
}

export {
    ScrollToTop,
    ScrollDownToLocation
}