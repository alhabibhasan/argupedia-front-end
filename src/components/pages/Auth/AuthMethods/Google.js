import React from 'react'
import firebase from '../../../../data/auth/fire'
import { redirectTo } from '../../../../util/redirect';
import Button from '../../../atoms/Button';
import './Styles/Google.scss'
import { createUser, checkIfUserExist } from '../../../../data/api/Api';

const Google = (props) => {
    const loginWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((userCred) => {
            checkIfUserExist(userCred.user.uid).then(check => {
                if(!check.userExists) {
                    createUser(userCred.user.uid, userCred.user.email)
                }
            })
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