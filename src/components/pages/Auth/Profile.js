import React, {useEffect, useState} from 'react'
import { userLoggedInAndEmailVerified } from '../../../data/auth/user-checks'
import { redirectTo } from '../../../util/redirect';
import styled from 'styled-components'
import InitialAvatar from '../../atoms/InitialAvatar';
import ImageAvatar from '../../atoms/ImageAvatar';

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Profile = (props) => {
    const [user, setUser] = useState(false)
    useEffect(() => {
        if (!userLoggedInAndEmailVerified(props.user)) {
            redirectTo(props.history, '/');
        } else {
            setUser(props.user)
        }
    }, [props.user])

    const getGreeting = () => {
        let greeting = 'Hey!'
        if (props.user.displayName) {
            greeting = 'Hey ' + props.user.displayName + '!'
        }
        return greeting
    }

    const getProfilePicture = () => {
        let imageURL = user.photoURL
        let image;
        if (!imageURL) {
            let name = user.displayName
            if (!name || !name.length) name = user.email
            image = <InitialAvatar name={name} size={150}/>
        } else {
            image = <ImageAvatar src={imageURL}/>
        }

        return (
            <ImageWrapper>
                {image}
            </ImageWrapper>
        )

    }

    const getPosts = () => {
        return (
            <div>
                Will get all content posted by user.
            </div>
        )
    }

    const renderProfile = () => {
        if (!user) {
            return <div>
                Waiting to auth listener
            </div>
        }

        return (<div>
            <h1>
                {getGreeting()}
            </h1>
            <div>
                {getProfilePicture()}
            </div>
            <div>
                {getPosts()}
            </div>
        </div>)

    }

    return renderProfile()
}

export default Profile