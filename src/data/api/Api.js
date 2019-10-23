import axios from 'axios'

const getArgumentChain = () => {
    return axios.get(process.env.REACT_APP_API_BASE_URL + '/getArgChain')
        .then(res => {
            return res.data;
        })
}

export {
    getArgumentChain
}