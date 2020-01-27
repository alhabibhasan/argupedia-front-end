import React from 'react'

const ImageAvatar = (props) => {

    const ImageStyles = {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        margin: '20px 0',
    }

    return (
        <img style={ImageStyles} src={props.src} 
            alt='User profile image.'/>
    )
}   

export default ImageAvatar