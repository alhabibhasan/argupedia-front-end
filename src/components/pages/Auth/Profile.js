import React, {useEffect, useState} from 'react'
import { userLoggedInAndEmailVerified } from '../../../data/auth/user-checks'
import { redirectTo } from '../../../util/redirect';
import styled from 'styled-components'
import InitialAvatar from '../../atoms/InitialAvatar';
import ImageAvatar from '../../atoms/ImageAvatar';
import { getUserPosts } from '../../../data/api/requests/get';
import UserPosts from '../../atoms/UserPosts';
import Loading from '../../atoms/Loading'
import Title from '../../molecules/Title';

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Posts = styled.div`
    display: grid;
    grid-template-columns: auto auto;

    @media all and (max-width:800px) {
        grid-template-columns: auto;
    }
`

const PostsHeader = styled.div`
    font-size: 18pt;
    font-weight: 500;
`

const Profile = (props) => {
    const [user, setUser] = useState(false)
    const [userPosts, setUserPosts] = useState()
    useEffect(() => {
        if (!userLoggedInAndEmailVerified(props.user)) {
            redirectTo(props.history, '/');
        } else {
            getUserPosts()
            .then(resp => {
                setUserPosts(resp)
            })
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

    const renderPosts = () => {
        if (!userPosts) {
            return  <Loading/>
        } else {
            let rootPosts = <div>No posts found</div>
            let nonRoots = <div>No responses found</div>
            if (userPosts.rootPosts.length > 0) { rootPosts = <UserPosts {...props} posts={userPosts.rootPosts}/> }
            if (userPosts.nonRoots.length > 0) { nonRoots = <UserPosts {...props} posts={userPosts.nonRoots}/>}     
            
            let posts = <Posts>
                <div>
                    <PostsHeader>
                        Posts you created
                    </PostsHeader>
                    <br/> 
                    {rootPosts}
                </div>
                <div>
                    <PostsHeader>
                        Your responses to other posts
                    </PostsHeader>
                    <br/> 
                    {nonRoots}
                </div>
            </Posts>

            return posts
        }
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
                {renderPosts()}
            </div>
        </div>)

    }

    return (
        <div>
            <Title title={'Profile'}/>
            {renderProfile()}
        </div>
    )
}

export default Profile