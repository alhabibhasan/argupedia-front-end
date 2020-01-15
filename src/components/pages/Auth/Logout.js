import React, {useState, useEffect} from 'react';
import firebase from '../../../data/auth/fire'
import styled from 'styled-components'

const Header = styled.h1`
    margin-top: 5%;

`
const LogoutView = (props) => {

    const [loggedOut, setLoggedOut] = useState(false)

    useEffect(() => {
        firebase.auth().signOut().then(() => {
            setLoggedOut(true);
        })
    }, [])

    return (
        <div>
            {loggedOut ? 
                <div>
                    <Header>You've been logged out.</Header> 
                    <p>See you soon!</p>
                </div> : 
                <Header>We are logging you out!</Header>}
        </div>
    );
}

export default LogoutView;
