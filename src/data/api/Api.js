import axios from 'axios'

const getArgumentChain = () => {
    return axios.get(process.env.REACT_APP_API_BASE_URL + '/getArgChain')
        .then(res => res.data.argChain)
}

const getArgumentRoots = () => {
    return axios.get(process.env.REACT_APP_API_BASE_URL + '/getRootArgs')
        .then(res => res.data.rootArgs)
}

export {
    getArgumentChain,
    getArgumentRoots
}