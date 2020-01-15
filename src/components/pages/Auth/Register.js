import React, {useEffect, useState} from 'react';

import { redirectTo } from '../../../util/redirect';
import EmailPasswordForm from '../../molecules/Auth/EmailPasswordForm';
import { withRouter } from 'react-router-dom';
import errorMessages from './error-messages';
import firebase from '../../../data/auth/fire'
import { userLoggedInAndEmailVerified } from '../../../data/auth/user-checks';

const registerStyles = {
    marginTop: '5%'
}

const welcomeStyles = {
    margin: '5%'
}

const RegisterView = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [info, setInfo] = useState('')

    useEffect(() => {
        if (userLoggedInAndEmailVerified( props.user)) {
            redirectTo(props.history, '/');
        }
    })

    const registerUser = (e) => {
        e.preventDefault()
        if (password.length === 0 || passwordConfirm.length === 0 || email.length === 0) {
            setInfo('Fill in all fields.')
            return 
        }
        if (password !== passwordConfirm) {
            setInfo('Passwords do not match.')
            return
        }

        firebase.auth().createUserWithEmailAndPassword(email, passwordConfirm).then(userCred => {
            firebase.auth().currentUser.sendEmailVerification().then(() => {
                setInfo('A verification email has been sent to ' + email + ' please activate your account using that link and then login.')
                firebase.auth().signOut()
            })
        }).catch(err => {
            let errorMessage = errorMessages[err.code]
            if (errorMessage) {
                setInfo(errorMessage)
            } else {
                setInfo(errorMessages['default'])
            }
        })
        
    }

    return (
        <div>
            <h1 style={welcomeStyles}>Hey! Register to join in!</h1>
            <div style={registerStyles}>
                <EmailPasswordForm 
                    setEmail={setEmail} 
                    setPassword={setPassword}
                    setPasswordConfirm={setPasswordConfirm}
                    onSubmit={registerUser}
                    buttonText={'Register'}/>
                {info.length > 0 ? <div>{info}</div> : ''}
            </div>
        </div>
    );
}

export default withRouter(RegisterView);
