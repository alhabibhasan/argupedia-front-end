import React from 'react'

const InitialAvatar = (props) => {
    const InitialStyles = {
        width: props.size + 'px',
        height: props.size + 'px',
        borderRadius: '50%',
        background: '#512DA8',
        fontSize: '35px',
        color: '#fff',
        textAlign: 'center',
        lineHeight: '150px',
        margin: '20px 0'
    }
    const getInitials = (name) => {
        let names = name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    return <div style={InitialStyles}> {getInitials(props.name)} </div>
}   

export default InitialAvatar