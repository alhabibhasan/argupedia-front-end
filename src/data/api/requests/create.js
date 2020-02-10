import axios from 'axios'
import getAuthToken from '../util'

const createArgument = (arg) => {
    return getAuthToken()
    .then(config => {
        return axios.post(process.env.REACT_APP_API_BASE_URL+ '/arg/create/arg', arg, config)
            .then(res => res.data)
            .catch(err => {
                throw new Error(err)
            })
    })
}

const createResponse = (rootId, arg) => {
    return getAuthToken()
    .then(config => {
        return axios.post(process.env.REACT_APP_API_BASE_URL+ '/arg/create/response/' + rootId, arg, config)
            .then(res => res.data)
            .catch(err => {
                throw new Error(err)
            })
    })
}

const createUser = (uid, email, displayName) => {
    return axios.post(process.env.REACT_APP_API_BASE_URL+ '/user/create/', 
        {
            uid, 
            email,
            displayName
        })
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

const upvote = (argId, uid) => {
    return getAuthToken()
    .then(config => {
        return axios.post(process.env.REACT_APP_API_BASE_URL + '/arg/vote/up/' + argId, {'uid': uid}, config)
            .then(res => res.data)
            .catch(err => {
                throw new Error(err)
            })
    })
}

const downvote = (argId, uid) => {
    return getAuthToken()
    .then(config => {
        return axios.post(process.env.REACT_APP_API_BASE_URL + '/arg/vote/down/' + argId, {'uid': uid}, config)
            .then(res => res.data)
            .catch(err => {
                throw new Error(err)
            })
    })
}


export {
    createUser,
    createArgument,
    createResponse,
    upvote,
    downvote
}