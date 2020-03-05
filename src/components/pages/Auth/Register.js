import React, {useEffect, useState} from 'react'

import { redirectTo } from '../../../util/redirect'
import EmailPasswordForm from '../../molecules/Auth/EmailPasswordForm'
import { withRouter } from 'react-router-dom'
import errorMessages from './error-messages'
import firebase from '../../../data/auth/fire'
import { userLoggedInAndEmailVerified } from '../../../data/auth/user-checks'
import styled from 'styled-components'
import Title from '../../molecules/Title'
import { createUser } from '../../../data/api/requests/create'
import ReCAPTCHA from "react-google-recaptcha";

const registerStyles = {
    marginTop: '5%',
}

const captchaStyles = {
    margin: 'auto',
    width: 'fit-content'
}

const welcomeStyles = {
}

const Input = styled.input`
    width: 30%;
    margin-bottom: 15px;
`

const RegisterView = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [info, setInfo] = useState('')
    const [humanVerified, setHumanVerified] = useState(false)

    useEffect(() => {
        if (userLoggedInAndEmailVerified( props.user)) {
            redirectTo(props.history, '/')
        }
    })

    const registerUser = (e) => {
        e.preventDefault()
        if (password.length === 0 || passwordConfirm.length === 0 || email.length === 0 || displayName.length === 0) {
            setInfo('Fill in all fields.')
            return 
        }
        if (password !== passwordConfirm) {
            setInfo('Passwords do not match.')
            return
        }
        setInfo('Signing you up... Hang on!')
        firebase.auth().createUserWithEmailAndPassword(email, passwordConfirm).then(userCred => {
            firebase.auth().currentUser.sendEmailVerification().then(() => {
                setInfo('A verification email has been sent to ' + email + ' please activate your account using that link and then login.')
                setPassword('')
                setPasswordConfirm('')
                firebase.auth().currentUser.updateProfile({
                    displayName: displayName
                }).then(() => {
                    createUser(userCred.user.uid, userCred.user.email, userCred.user.displayName)
                    firebase.auth().signOut()
                })
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
            <Title title={'Register'}/>
            <h1 style={welcomeStyles}>Hey! Register to join in!</h1>
            <div style={registerStyles}>
                <Input placeholder='Diplay name' 
                        value={displayName} 
                        onChange={e => setDisplayName(e.target.value)}/>
                <EmailPasswordForm 
                    setEmail={setEmail} 
                    setPassword={setPassword}
                    setPasswordConfirm={setPasswordConfirm}
                    onSubmit={registerUser}
                    buttonText={'Register'}
                    enabled={humanVerified}/>
                <div style={captchaStyles}>
                    <ReCAPTCHA
                        sitekey="6LccG98UAAAAAJtjBaWNAY5J6Vke3JHq5pJOtHYd"
                        onChange={() => setHumanVerified(true)}
                    />
                </div>
                {info.length > 0 ? <div>{info}</div> : ''}
            </div>
        </div>
    );
}

export default withRouter(RegisterView)
