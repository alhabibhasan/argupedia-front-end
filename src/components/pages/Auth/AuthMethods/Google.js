import React from 'react'
import firebase from '../../../../data/auth/fire'
import { redirectTo } from '../../../../util/redirect';
import Button from '../../../atoms/Button';
import './Styles/Google.scss'

const Google = (props) => {
    const loginWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            redirectTo(props.history, '/');
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <Button text={<span>Sign in with &nbsp; <i className="fa fa-google"></i></span>}
                onClick={(e) => loginWithGoogle()}
                style={{
                    fontSize: '14pt',
                    backgroundColor: 'rgb(230, 230, 230)'
                }}>
            </Button>
        </div>
    )
}

export default Google