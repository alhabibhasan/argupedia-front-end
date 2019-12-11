import axios from 'axios'

const getArgumentChain = (rootId) => {
    return axios.get(process.env.REACT_APP_API_BASE_URL + '/getArgChain/' + rootId)
        .then(res => res.data.argChain)
        .catch(err => console.log(err))
}

const getArgumentRoots = () => {
    return axios.get(process.env.REACT_APP_API_BASE_URL + '/getRootArgs')
        .then(res => res.data.rootArgs)
        .catch(err => console.log(err))
}

const createArgument = (arg) => {
    return axios.post(process.env.REACT_APP_API_BASE_URL+ '/createArg', arg)
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

const createResponse = (rootId, arg) => {
    return axios.post(process.env.REACT_APP_API_BASE_URL+ '/' + rootId + '/createResponse', arg)
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

export {
    getArgumentChain,
    getArgumentRoots,
    createArgument,
    createResponse
}