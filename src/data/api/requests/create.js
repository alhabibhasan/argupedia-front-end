import axios from 'axios'

const createArgument = (arg) => {
    return axios.post(process.env.REACT_APP_API_BASE_URL+ '/arg/create/arg', arg)
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

const createResponse = (rootId, arg) => {
    return axios.post(process.env.REACT_APP_API_BASE_URL+ '/arg/create/response/' + rootId, arg)
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
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
    return axios.post(process.env.REACT_APP_API_BASE_URL + '/arg/vote/up/' + argId, {'uid': uid})
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

const downvote = (argId, uid) => {
    return axios.post(process.env.REACT_APP_API_BASE_URL + '/arg/vote/down/' + argId, {'uid': uid})
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}


export {
    createUser,
    createArgument,
    createResponse,
    upvote,
    downvote
}