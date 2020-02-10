import axios from 'axios'
import getAuthToken from '../util'

const checkIfUserExist = (uid) => {
    return axios.post(process.env.REACT_APP_API_BASE_URL+ '/user/check/', {'uid': uid})
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

const getArgumentChain = (rootId) => {
    getAuthToken()
    return axios.get(process.env.REACT_APP_API_BASE_URL + '/arg/read/argChain/' + rootId)
        .then(res => res.data)
        .catch(err => console.log(err))
}

const getArgumentRoots = () => {
    return axios.get(process.env.REACT_APP_API_BASE_URL + '/arg/read/rootArgs')
        .then(res => res.data.rootArgs)
        .catch(err => console.log(err))
}

const getThread = (rootId) => {
    return axios.get(process.env.REACT_APP_API_BASE_URL + '/arg/read/thread/' + rootId)
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

const getNumberOfVotes = (argId, uid) => {
    if (!uid || uid.length === 0) uid =''
    return axios.post(process.env.REACT_APP_API_BASE_URL + '/arg/vote/' + argId, {'uid': uid})
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

export {
    getArgumentChain,
    getArgumentRoots,
    getThread,
    getNumberOfVotes,
    checkIfUserExist
}