import React, {useState} from 'react'
import firebase from '../../../../data/auth/fire'
import { redirectTo } from '../../../../util/redirect';
import Button from '../../../atoms/Button';
import { auth } from '../../../../data/routes';
import { withRouter } from 'react-router-dom';
import errorMessages from '../error-messages';
import EmailPasswordForm from '../../../molecules/Auth/EmailPasswordForm';

const Email = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [info, setInfo] = useState('')

    const loginWithEmail = (e) => {
        setInfo('Checking...')
        e.preventDefault()
        return firebase.auth().signInWithEmailAndPassword(email, password).then((userCred) => {
            if (!userCred.user.emailVerified) {
                setInfo('You need to verify your account using the email link sent to you. Please check your inbox and junk folder.')
                return firebase.auth().currentUser.sendEmailVerification().then(() => firebase.auth().signOut())
            } else {
                setInfo('')
                redirectTo(props.history, '/');
            }
        }).catch((err) => {
            let errorMessage = errorMessages[err.code]
            if (errorMessage) {
                setInfo(errorMessage)
            } else {
                setInfo(errorMessages['default'])
            }
        });
    }

    return (
        <div>
            <EmailPasswordForm 
                onSubmit={loginWithEmail} 
                setEmail={setEmail} 
                setPassword={setPassword}
                history={props.history}
                buttonText={'Login'}/>  
            {info.length > 0 ? <div>{info}</div> : ''}
            <Button text={'Forgot password?'}
                onClick={() => redirectTo(props.history, auth.passwordReset.use)}
                style={{
                    fontSize: '12pt',
                }}>
            </Button>
        </div>

    )
}

export default withRouter(Email)