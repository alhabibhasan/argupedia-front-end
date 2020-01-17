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

const createUser = (uid, email) => {
    return axios.post(process.env.REACT_APP_API_BASE_URL+ '/user/create/', {uid, email})
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

const checkIfUserExist = (uid) => {
    return axios.post(process.env.REACT_APP_API_BASE_URL+ '/user/check/', {'uid': uid})
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

const getArgumentChain = (rootId) => {
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

export {
    createArgument,
    createResponse,
    createUser,
    checkIfUserExist,
    getArgumentChain,
    getArgumentRoots,
    getThread,
}