import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { redirectTo } from '../../util/redirect'
import { readArgument } from '../../data/routes'

const Statement = styled.div`
    font-size: 16pt;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

const Post = styled.div`
    margin: auto;
    max-width: 550px;
    background-color: #dff0ef;
    padding: 10px;
    margin-top: 10px;
`

const Posts = styled.div`
    max-height: 40vh;
    overflow: scroll;
`

const UserPosts = (props) => {
    const renderPosts = () => {
        let post = props.posts
        post = post.map((post, i) => {
            return (
                <Post key={i}>
                    <Statement>
                        {post.statement}
                    </Statement>
                    <div>
                        Posted on: {new Date(post.createdAt).toGMTString()}
                    </div>
                    <div>
                        &uarr; {post.votes.upvotes} | &darr; {post.votes.downvotes}
                    </div>
                    <Button 
                        text={'View'} 
                        style={{fontSize: '14pt'}} 
                        onClick={() => {
                            redirectTo(props.history, readArgument.use + post.id)
                        }}/>
                </Post>

            )
        })
        return <Posts>
            {post}
        </Posts>
    }
    return renderPosts()
}

export default UserPosts