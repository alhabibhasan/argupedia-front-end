import React, {useEffect, useState} from 'react';
import { redirectTo } from '../../../util/redirect';
import Google from './AuthMethods/Google';
import Email from './AuthMethods/Email';
import { userLoggedInAndEmailVerified } from '../../../data/auth/user-checks';

const methodStyles = {
    marginTop: '5%'
}

const welcomeStyles = {
    margin: '5%'
}

const messageStyles = {
}

const LoginView = (props) => {
    const [message, setMessage] = useState(props.message || '')
    useEffect(() => {
        if (userLoggedInAndEmailVerified(props.user)) {
            redirectTo(props.history, '/');
        }
    })

    return (
        <div>
            <h1 style={welcomeStyles}>Welcome, login to join in!</h1>
            <div style={methodStyles}>
                <Email history={props.history}/>
            </div>
            <div style={messageStyles}>
                {message}
            </div>
            <div style={methodStyles}>
                <Google history={props.history}/>
            </div>
        </div>
    );
}

export default LoginView;
