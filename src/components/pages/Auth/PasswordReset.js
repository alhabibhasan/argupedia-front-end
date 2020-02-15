import React, {useEffect, useState} from 'react';
import { redirectTo } from '../../../util/redirect';
import styled from 'styled-components'
import Button from '../../atoms/Button';
import firebase from '../../../data/auth/fire'
import errorMessages from './error-messages';
import { userLoggedInAndEmailVerified } from '../../../data/auth/user-checks';
import Title from '../../molecules/Title';

const Input = styled.input`
    width: 30%;
`

const passwordResetStyles = {
    margin: '5%'
}

const headerStyles = {
    margin: '5%'
}

const successMessage = 'If an account with that email address exists, we\'ve sent a reset link to it.'

const PasswordResetView = (props) => {
    const [email, setEmail] = useState('')
    const [info, setInfo] = useState('')

    useEffect(() => {
        if (userLoggedInAndEmailVerified( props.user)) {
            redirectTo(props.history, '/');
        }
    })

    const sendPasswordResetEmail = (e) => {
        e.preventDefault()
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            setInfo(successMessage)
        }).catch(err => {
            let errorMessage = errorMessages[err.code]
            if (err.code === 'auth/user-not-found') {
                setInfo(successMessage)
            }
            else if (errorMessage) {
                setInfo(errorMessage)
            }
        })
    }

    return (
        <div style={passwordResetStyles}>
            <Title title={'Password Reset'}/>
            <h1 style={headerStyles}>Locked out? We can help...</h1>
            <form onKeyDown={e => e.key === 'Enter' ? sendPasswordResetEmail(e) : false}>
                <Input type="email"
                            placeholder="email@address.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                {info.length > 0 ? <div>{info}</div> : ''}
            </form>
            <Button type='button' text={'Send reset link'} 
                    onClick={e => sendPasswordResetEmail(e)}
                    style={{
                        marginTop: '5%',
                        marginBottom: '1%',
                        fontSize: '14pt',
                        backgroundColor: 'rgb(230, 230, 230)'
                    }}/>
        </div>
    );
}

export default PasswordResetView;
