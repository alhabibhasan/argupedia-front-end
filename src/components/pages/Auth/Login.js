import React, {useEffect, useState} from 'react';
import { redirectTo } from '../../../util/redirect';
import Google from './AuthMethods/Google';
import Email from './AuthMethods/Email';
import { userLoggedInAndEmailVerified } from '../../../data/auth/user-checks';
import Title from '../../molecules/Title';
import { userChecks } from '../../../data/api/requests/get';
import firebase from '../../../data/auth/fire'
import { createUser } from '../../../data/api/requests/create';
import { useAlert } from 'react-alert'

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
    const alert = useAlert()
    
    useEffect(() => {
        if (userLoggedInAndEmailVerified(props.user)) {
            redirectTo(props.history, '/');
        }
    })

    const postSignInActions = (userCred) => {
        if (!userCred.user.emailVerified) {
            alert.show('You need to verify your account using the email link sent to you. Please check your inbox and junk folder.')
            return firebase.auth().currentUser.sendEmailVerification().then(() => firebase.auth().signOut())
        } else {
            setMessage('')
            userChecks(userCred.user.uid).then(check => {
                if(!check.userExists) {
                    debugger
                    createUser(userCred.user.uid, userCred.user.email, userCred.user.displayName)
                }
                if (check.blocked) {
                    firebase.auth().signOut()
                    .then(() => {
                        alert.show('Your account has been blocked, please contact admin@argupedia.com to discuss the issue.')
                    })
                }
            })
        }
    }

    return (
        <div>
            <Title title={'Login'}/>
            <h1 style={welcomeStyles}>Welcome, login to join in!</h1>
            <div style={methodStyles}>
                <Email history={props.history} postSignInActions={postSignInActions}/>
            </div>
            <div style={messageStyles}>
                {message}
            </div>
            <div style={methodStyles}>
                <Google history={props.history} postSignInActions={postSignInActions}/>
            </div>
        </div>
    );
}

export default LoginView;
